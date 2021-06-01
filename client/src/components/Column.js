import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import AddItem from './AddItem';
import Item from './Item';
import { v4 as uuid } from 'uuid';

const Column = ({ columnId, column, addTask, changeColumnName }) => {
    const [addingItem, setAddingItem] = useState(false);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div
                className="p-3 columns"
                style={{
                    margin: 8,
                    backgroundColor: 'lightgrey',
                    borderRadius: '5px',
                    position: 'relative'
                }}
            >
                <textarea
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.target.value = e.target.value.trim();
                            e.target.blur();
                        }
                    }}
                    onBlur={(e) => {
                        changeColumnName(columnId, e.target.value);
                    }}
                    spellCheck={false}
                    className="font-size-1.2em"
                    maxLength="50"
                    defaultValue={column.title}
                />
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                        ? 'gray'
                                        : 'lightgrey',
                                    width: 250,
                                    minHeight: 100,
                                    borderRadius: '5px'
                                }}
                            >
                                {column.tasks.map((task, index) => {
                                    return (
                                        <Item
                                            task={task}
                                            index={index}
                                            key={task.id}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
                {addingItem ? (
                    <AddItem
                        addTask={addTask}
                        columnId={columnId}
                        setAddingItem={setAddingItem}
                        addingItem={addingItem}
                    />
                ) : (
                    <button onClick={() => setAddingItem(true)} href="#">
                        + Add another card
                    </button>
                )}
            </div>
        </div>
    );
};

export default Column;
