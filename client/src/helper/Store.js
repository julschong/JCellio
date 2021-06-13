import React, { useState } from 'react';
import ColumnService from '../services/columnService';
import taskService from '../services/taskService';

export const StoreContext = React.createContext(null);

const Store = ({ children }) => {
    // columns keeps track on colmuns data
    const [columns, setColumns] = useState([]);
    // position keeps track of columns position or index
    const [position, setPosition] = useState([]);
    // addColumn controls if addColumn form is opened or closed
    const [addingColumn, setAddingColumn] = useState(false);
    const [changeTaskModal, setChangeTaskModel] = useState(null);
    const [dropDisabled, setDropDisabled] = useState(false);

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

        const savedTask = await taskService.createTask(newTask);

        setColumns((prev) => {
            const newData = [];
            for (const d of prev) {
                if (d.id === columnId) {
                    d.tasks.push(savedTask.data);
                    d.taskPos.push(savedTask.data.id);
                }
                newData.push(d);
            }
            return [...newData];
        });
    };

    const deleteColumn = async (columnId) => {
        setColumns((prev) => prev.filter((column) => column.id !== columnId));
        setPosition((prev) => prev.filter((pos) => pos !== columnId));
        await ColumnService.deleteColumn(columnId);
    };

    const deleteTask = async (columnId, taskId) => {
        await taskService.deleteTaskById(taskId);
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
            console.log(newColumn);
            return [
                ...prev.filter((column) => column.id !== columnId),
                newColumn
            ];
        });
    };

    const store = {
        columns,
        setColumns,
        position,
        setPosition,
        addingColumn,
        setAddingColumn,
        changeTaskModal,
        setChangeTaskModel,
        dropDisabled,
        setDropDisabled,
        dragEnd,
        changeColumnName,
        addTask,
        deleteColumn,
        deleteTask
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default Store;
