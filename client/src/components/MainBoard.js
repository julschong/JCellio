import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { FETCH } from '../helper/url';
import ColumnService from '../services/columnService';
import taskService from '../services/taskService';
import AddColumn from './AddColumn';
import Column from './Column';
import './MainBoard.css';
import TaskModal from './TaskModal';

const MainBoard = ({ data, selectedIndex }) => {
    // columns keeps track on colmuns data
    const [columns, setColumns] = useState([]);
    // position keeps track of columns position or index
    const [position, setPosition] = useState([]);
    // addColumn controls if addColumn form is opened or closed
    const [addingColumn, setAddingColumn] = useState(false);

    const [changeTaskModal, setChangeTaskModel] = useState(null);

    const [dropDisabled, setDropDisabled] = useState(false);

    // refreshes when data changes
    useEffect(() => {
        if (data && data.length > 0) {
            setColumns(data[selectedIndex].columns);
            setPosition(data[selectedIndex].colPos);
        }
    }, [data, selectedIndex]);

    // ref to the div at the end, when new column is added, scroll to the end
    const scrollToEnd = useRef();

    // function to exec when dragging ends
    const dragEnd = async (result) => {
        //destructure to access source and destination
        const { source, destination } = result;

        // if destination is valid, perforce logic and send Data to backend
        if (destination) {
            setDropDisabled(true);
            if (
                source.droppableId === destination.droppableId &&
                source.index === destination.index
            ) {
                return setDropDisabled(false);
            }
            setColumns((prev) => {
                const srcCol = {
                    ...prev.find(
                        (column) => column.id === Number(source.droppableId)
                    )
                };
                const task = {
                    ...srcCol.tasks.find(
                        (task) => task.id === Number(result.draggableId)
                    )
                };
                task.columnId = Number(destination.droppableId);

                let destCol = {
                    ...prev.find(
                        (column) =>
                            column.id === Number(destination.droppableId)
                    )
                };

                srcCol.tasks = srcCol.tasks.filter(
                    (task) => task.id !== Number(result.draggableId)
                );
                srcCol.taskPos = srcCol.taskPos.filter(
                    (id) => id !== Number(result.draggableId)
                );

                if (srcCol.id === destCol.id) {
                    destCol = srcCol;
                }

                destCol.tasks.push(task);
                destCol.taskPos.splice(destination.index, 0, task.id);

                const newData = [...prev].map((column) => {
                    if (column.id === destCol.id) {
                        return destCol;
                    } else if (column.id === srcCol.id) {
                        return srcCol;
                    }
                    return column;
                });

                return [...newData];
            });

            await taskService.swapTaskPos(
                Number(result.draggableId),
                Number(destination.droppableId),
                destination.index
            );
            setDropDisabled(false);
        }
    };

    // TODO: fix race condition...
    const addColumn = async (name) => {
        const newColumn = {
            title: `${name}`,
            boardId: data[selectedIndex].id
        };
        const savedColumn = await ColumnService.addColumn(newColumn);

        setColumns((prev) => {
            const newData = [...prev, savedColumn.data];
            return [...newData];
        });
        setPosition((prev) => [...prev, savedColumn.data.id]);
        setAddingColumn(false);
        scrollToEnd.current.scrollIntoView({ behavior: 'smooth' });
    };

    const changeColumnName = async (columnId, newName) => {
        setColumns((prev) => {
            const newColumn = {
                ...prev.find((column) => column.id === columnId)
            };
            newColumn.name = newName;
            return [
                ...prev.filter((column) => column.id !== columnId),
                newColumn
            ];
        });
        await ColumnService.changeColumnName(columnId, newName);
    };

    const addTask = async (columnId, newTitle) => {
        const newTask = {
            name: newTitle,
            columnId
        };

        const savedTask = await axios.post(`${FETCH.BASE_URL}/tasks`, newTask);

        setColumns((prev) => {
            const newData = [];
            for (const d of prev) {
                if (d.id === columnId) {
                    d.tasks.push(savedTask.data.data);
                    d.taskPos.push(savedTask.data.data.id);
                }
                newData.push(d);
            }
            return [...newData];
        });
    };

    const deleteTask = async (columnId, taskId) => {
        setColumns((prev) => {
            const newColumn = {
                ...prev.find((column) => column.id === columnId)
            };
            newColumn.tasks = newColumn.tasks.filter(
                (task) => task.id !== taskId
            );
            newColumn.taskPos = newColumn.taskPos.filter(
                (taskIdInData) => taskIdInData !== taskId
            );
            return [
                ...prev.filter((column) => column.id !== columnId),
                newColumn
            ];
        });
        await taskService.deleteTaskById(taskId);
    };

    const deleteColumn = async (columnId) => {
        setColumns((prev) => prev.filter((column) => column.id !== columnId));
        setPosition((prev) => prev.filter((pos) => pos !== columnId));
        await ColumnService.deleteColumn(columnId);
    };

    return (
        <>
            {columns && data && data.length > 0 ? (
                <div className="main">
                    <DragDropContext onDragEnd={dragEnd}>
                        {position.map((pos, index) => {
                            const column = columns.find(
                                (col) => col.id === pos
                            );
                            const columnId = column.id;
                            return (
                                <Column
                                    pos={index}
                                    key={String(columnId)}
                                    column={column}
                                    columnId={columnId}
                                    addTask={addTask}
                                    deleteTask={deleteTask}
                                    deleteColumn={deleteColumn}
                                    changeColumnName={changeColumnName}
                                    setChangeTaskModel={setChangeTaskModel}
                                    dropDisabled={dropDisabled}
                                />
                            );
                        })}
                    </DragDropContext>
                    <AddColumn
                        addColumn={addColumn}
                        addingColumn={addingColumn}
                        setAddingColumn={setAddingColumn}
                    />
                    {changeTaskModal ? (
                        <TaskModal setChangeTaskModel={setChangeTaskModel} />
                    ) : null}
                    <div ref={scrollToEnd} />
                </div>
            ) : null}
        </>
    );
};

export default MainBoard;
