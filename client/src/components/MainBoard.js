import { useEffect, useState } from 'react';
import { columnsFromBackend } from '../_data';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { v4 as uuid } from 'uuid';
import AddColumn from './AddColumn';

const MainBoard = ({ data, selectedIndex }) => {
    const [columns, setColumns] = useState();
    useEffect(() => {
        if (data) {
            setColumns(data[selectedIndex].columns);
        }
    }, [data, selectedIndex]);
    const [addingColumn, setAddingColumn] = useState(false);

    const dragEnd = (result) => {
        const { source, destination } = result;
        console.log(result);

        if (destination) {
            if (
                source.droppableId === destination.droppableId &&
                source.index === destination.index
            ) {
                return;
            }
            setColumns((prev) => {
                const sourceItems = Array.from(prev[source.droppableId].tasks);
                let destinationItems = Array.from(
                    prev[destination.droppableId].tasks
                );

                const itemMoved = sourceItems.splice(source.index, 1);

                if (destination.droppableId === source.droppableId) {
                    destinationItems = [...sourceItems];
                    destinationItems.splice(destination.index, 0, itemMoved[0]);
                } else {
                    destinationItems.splice(destination.index, 0, itemMoved[0]);
                }

                return {
                    ...prev,
                    [source.droppableId]: {
                        ...prev[source.droppableId],
                        tasks: sourceItems
                    },
                    [destination.droppableId]: {
                        ...prev[destination.droppableId],
                        tasks: destinationItems
                    }
                };
            });
        }
    };

    const addColumn = (name) => {
        const newColumn = {
            tasks: [],
            title: `${name}`
        };
        setColumns((prev) => {
            return { ...prev, [uuid()]: newColumn };
        });
    };
    const changeColumnName = (columnId, newName) => {
        setColumns((prev) => {
            return {
                ...prev,
                [columnId]: { ...prev[columnId], title: newName }
            };
        });
    };

    const addTask = (columnId, newTitle) => {
        const newTask = {
            name: newTitle,
            id: uuid()
        };
        setColumns((prev) => {
            return {
                ...prev,
                [columnId]: {
                    ...prev[columnId],
                    tasks: [...prev[columnId].tasks, newTask]
                }
            };
        });
    };

    return (
        <>
            {columns ? (
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
                        {Object.entries(columns).map(
                            ([columnId, column], index) => {
                                return (
                                    <Column
                                        key={columnId}
                                        column={column}
                                        columnId={columnId}
                                        addTask={addTask}
                                        changeColumnName={changeColumnName}
                                    />
                                );
                            }
                        )}
                    </DragDropContext>

                    <AddColumn
                        addColumn={addColumn}
                        addingColumn={addingColumn}
                        setAddingColumn={setAddingColumn}
                    />
                </div>
            ) : null}
        </>
    );
};

export default MainBoard;
