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
    const [columns, setColumns] = useState({ data: [], pos: [] });
    useEffect(() => {
        if (data && data.length > 0) {
            setColumns({
                data: data[selectedIndex].columns,
                pos: data[selectedIndex].colPos
            });
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
                    ...prev.data.find(
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
                    ...prev.data.find(
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

                const newData = [...prev.data].map((column) => {
                    if (column.id === destCol.id) {
                        return destCol;
                    } else if (column.id === srcCol.id) {
                        return srcCol;
                    }
                    return column;
                });

                return { ...prev, data: newData };
            });
            taskService.swapTaskPos(
                Number(result.draggableId),
                Number(destination.droppableId),
                destination.index
            );
        }
    };

    const addColumn = async (name) => {
        const newColumn = {
            title: `${name}`,
            boardId: data[selectedIndex].id
        };
        const savedColumn = await ColumnService.addColumn(newColumn);

        setColumns((prev) => {
            const newData = [...prev.data, savedColumn.data];
            const newPos = [...prev.pos, savedColumn.data.id];
            return { pos: newPos, data: newData };
        });
        setAddingColumn(false);
        scrollToEnd.current.scrollIntoView({ behavior: 'smooth' });
    };
    const changeColumnName = async (columnId, newName) => {
        setColumns((prev) => {
            const newColumn = {
                ...prev.data.find((column) => column.id === columnId)
            };
            newColumn.name = newName;
            const newData = [
                ...prev.data.filter((column) => column.id !== columnId),
                newColumn
            ];
            return {
                ...prev,
                data: newData
            };
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
            for (const d of prev.data) {
                if (d.id === columnId) {
                    d.tasks.push(savedTask.data.data);
                    d.taskPos.push(savedTask.data.data.id);
                }
                newData.push(d);
            }
            return { ...prev, data: newData };
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
                        {columns.pos.map((pos, index) => {
                            const column = columns.data.find(
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
