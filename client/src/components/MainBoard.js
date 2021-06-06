import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// import { columnsFromBackend } from '../_data';
import { DragDropContext } from 'react-beautiful-dnd';
import { FETCH } from '../helper/url';
import ColumnService from '../services/columnService';
import taskService from '../services/taskService';
import AddColumn from './AddColumn';
import Column from './Column';

const MainBoard = ({ data, selectedIndex }) => {
    const [columns, setColumns] = useState([]);
    const [position, setPosition] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setColumns(data[selectedIndex].columns);
            setPosition(data[selectedIndex].colPos);
        }
    }, [data, selectedIndex]);

    const [addingColumn, setAddingColumn] = useState(false);
    const scrollToEnd = useRef();

    const dragEnd = async (result) => {
        const { source, destination } = result;
        if (destination) {
            if (
                source.droppableId === destination.droppableId &&
                source.index === destination.index
            ) {
                return;
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
            taskService.swapTaskPos(
                Number(result.draggableId),
                Number(destination.droppableId),
                destination.index
            );
        } else {
            setColumns((prev) => {
                console.log(prev);
                return prev;
            });
        }
    };

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

    return (
        <>
            {columns && data && data.length > 0 ? (
                <div
                    className="main"
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        height: '100%',
                        overflow: 'auto',
                        minWidth: '80vw'
                    }}
                >
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
                                    changeColumnName={changeColumnName}
                                />
                            );
                        })}
                    </DragDropContext>

                    <AddColumn
                        addColumn={addColumn}
                        addingColumn={addingColumn}
                        setAddingColumn={setAddingColumn}
                    />
                    <div ref={scrollToEnd} />
                </div>
            ) : null}
        </>
    );
};

export default MainBoard;
