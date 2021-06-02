import { useEffect, useState } from 'react';
// import { columnsFromBackend } from '../_data';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import AddColumn from './AddColumn';
import axios from 'axios';
import { FETCH } from '../helper/url';
import ColumnService from '../services/columnService';

const MainBoard = ({ data, selectedIndex }) => {
    const [columns, setColumns] = useState({ data: [], pos: [] });
    useEffect(() => {
        if (data) {
            setColumns({
                data: data[selectedIndex].columns,
                pos: data[selectedIndex].colPos
            });
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
            // setColumns((prev) => {
            //     const sourceItems = Array.from(prev[source.droppableId].tasks);
            //     let destinationItems = Array.from(
            //         prev[destination.droppableId].tasks
            //     );

            //     const itemMoved = sourceItems.splice(source.index, 1);

            //     if (destination.droppableId === source.droppableId) {
            //         destinationItems = [...sourceItems];
            //         destinationItems.splice(destination.index, 0, itemMoved[0]);
            //     } else {
            //         destinationItems.splice(destination.index, 0, itemMoved[0]);
            //     }

            //     return {
            //         ...prev,
            //         [source.droppableId]: {
            //             ...prev[source.droppableId],
            //             tasks: sourceItems
            //         },
            //         [destination.droppableId]: {
            //             ...prev[destination.droppableId],
            //             tasks: destinationItems
            //         }
            //     };
            // });
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
    };
    const changeColumnName = (columnId, newName) => {
        setColumns((prev) => {
            return {
                ...prev,
                [columnId]: { ...prev[columnId], title: newName }
            };
        });
    };

    const addTask = async (columnId, newTitle) => {
        const newTask = {
            name: newTitle,
            columnId
        };

        const savedTask = await axios.post(`${FETCH.BASE_URL}/tasks`, newTask);

        setColumns((prev) => {
            console.log(prev);
            const newData = [];
            for (const d of prev.data) {
                if (d.id === columnId) {
                    d.tasks.push(savedTask.data.data);
                }
                newData.push(d);
            }
            return { ...prev, data: newData };
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
                </div>
            ) : null}
        </>
    );
};

export default MainBoard;
