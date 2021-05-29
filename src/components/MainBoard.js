import { useState } from 'react';
import { columnsFromBackend } from '../_data';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { Button } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import AddColumn from './AddColumn';

const MainBoard = () => {
    const [columns, setColumns] = useState(columnsFromBackend);
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
                const sourceItems = Array.from(prev[source.droppableId].items);
                let destinationItems = Array.from(
                    prev[destination.droppableId].items
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
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...prev[destination.droppableId],
                        items: destinationItems
                    }
                };
            });
        }
    };

    const addColumn = (name) => {
        const newColumn = {
            items: [],
            name: `${name}`
        };
        setColumns((prev) => {
            return { ...prev, [uuid()]: newColumn };
        });
    };
    const changeColumnName = (columnId, newName) => {
        setColumns((prev) => {
            return {
                ...prev,
                [columnId]: { ...prev[columnId], name: newName }
            };
        });
    };

    const addItem = (columnId, newContent) => {
        const newItem = {
            content: newContent,
            id: uuid()
        };
        setColumns((prev) => {
            return {
                ...prev,
                [columnId]: {
                    ...prev[columnId],
                    items: [...prev[columnId].items, newItem]
                }
            };
        });
    };

    // const sortedColumns = useMemo(() => {
    //     const sortedColumns = [...Object.entries(columns)];
    //     sortedColumns.sort((a, b) => a[1].index - b[1].index);
    //     return sortedColumns;
    // }, [columns]);

    return (
        <>
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
                                    addItem={addItem}
                                    changeColumnName={changeColumnName}
                                />
                            );
                        }
                    )}
                </DragDropContext>
                {/* <Button
                    className="m-2"
                    onClick={addColumn}
                    style={{ maxHeight: '50px', whiteSpace: 'nowrap' }}
                >
                    Add Another List
                </Button> */}

                <AddColumn
                    addColumn={addColumn}
                    addingColumn={addingColumn}
                    setAddingColumn={setAddingColumn}
                />
            </div>
        </>
    );
};

export default MainBoard;
