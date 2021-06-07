import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ColumnOptions from './../ColumnOptions';
import AddItem from './AddItem';
import './Column.css';
import Task from './Task';

const Column = ({
    columnId,
    column,
    addTask,
    deleteTask,
    deleteColumn,
    changeColumnName,
    pos
}) => {
    const [addingItem, setAddingItem] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="column">
            <div className="p-3 columns column-card">
                <div className="column-edit">
                    <textarea
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.target.blur();
                            }
                        }}
                        onBlur={(e) => {
                            e.target.value = e.target.value.trim();
                            if (column.name !== e.target.value) {
                                changeColumnName(columnId, e.target.value);
                            }
                        }}
                        spellCheck={false}
                        className="font-size-1.2em"
                        maxLength="50"
                        defaultValue={column.title}
                    />
                    <img
                        className="more-option"
                        src="./assets/more.png"
                        alt="more"
                        onClick={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                        draggable={false}
                    />
                </div>
                {showDropdown ? (
                    <ColumnOptions
                        deleteColumn={deleteColumn}
                        columnId={columnId}
                        setShowDropdown={setShowDropdown}
                    />
                ) : null}

                <Droppable
                    droppableId={String(columnId)}
                    key={columnId + column.title}
                >
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
                                {column.taskPos.map((pos, index) => {
                                    let task = column.tasks.find(
                                        (task) => task.id === pos
                                    );
                                    const taskId = task ? task.id : null;

                                    return (
                                        <Task
                                            task={task}
                                            taskId={taskId}
                                            index={index}
                                            key={taskId}
                                            columnId={columnId}
                                            deleteTask={deleteTask}
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
                        pos={pos}
                        addTask={addTask}
                        columnId={columnId}
                        setAddingItem={setAddingItem}
                        addingItem={addingItem}
                    />
                ) : (
                    <button onClick={() => setAddingItem(true)} href="#">
                        + Add another task
                    </button>
                )}
            </div>
        </div>
    );
};

export default Column;
