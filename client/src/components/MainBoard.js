import { useContext, useEffect, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StoreContext } from '../helper/Store';
import ColumnService from '../services/columnService';
import AddColumn from './AddColumn';
import Column from './Column';
import './MainBoard.css';
import TaskModal from './TaskModal';

const MainBoard = ({ selectedIndex, board }) => {
    // columns keeps track on colmuns data
    const { columns, setColumns } = useContext(StoreContext);

    // position keeps track of columns position or index
    const { position, setPosition } = useContext(StoreContext);

    // addColumn controls if addColumn form is opened or closed
    const { setAddingColumn } = useContext(StoreContext);

    const { changeTaskModal } = useContext(StoreContext);

    const { dragEnd } = useContext(StoreContext);

    // refreshes when data changes
    useEffect(() => {
        if (board) {
            setColumns(board.columns);
            setPosition(board.colPos);
        }
    }, [board, selectedIndex, setColumns, setPosition]);

    // ref to the div at the end, when new column is added, scroll to the end
    const scrollToEnd = useRef();

    const addColumn = async (name, token) => {
        const newColumn = {
            title: `${name}`,
            boardId: board.id
        };
        const savedColumn = await ColumnService.addColumn(newColumn, token);

        setColumns((prev) => {
            const newData = [...prev, savedColumn.data];
            return [...newData];
        });
        setPosition((prev) => [...prev, savedColumn.data.id]);
        setAddingColumn(false);
        scrollToEnd.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {columns && board ? (
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
                                />
                            );
                        })}
                    </DragDropContext>
                    <AddColumn addColumn={addColumn} />
                    {changeTaskModal ? <TaskModal /> : null}
                    <div ref={scrollToEnd} />
                </div>
            ) : null}
        </>
    );
};

export default MainBoard;
