import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Task.css';
import TaskModal from './TaskModal';

const Task = ({ task, index, taskId, columnId, deleteTask }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Draggable draggableId={String(taskId)} index={index} key={taskId}>
                {(provided, snapshot) => {
                    const formattedTaskName = task
                        ? task.name.length < 30
                            ? task.name
                            : task.name.substring(0, 20) + '...'
                        : null;
                    return (
                        <div
                            className="task"
                            onClick={() => setShowModal(true)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                backgroundColor: snapshot.isDragging
                                    ? '#263B4A'
                                    : '#FFF',
                                ...provided.draggableProps.style
                            }}
                        >
                            <span className="text-break">
                                {formattedTaskName}
                            </span>
                            <button
                                className="delete-btn"
                                onClick={(e) => deleteTask(columnId, taskId)}
                            >
                                x
                            </button>
                        </div>
                    );
                }}
            </Draggable>
            {showModal ? (
                <TaskModal showModal={showModal} setShowModal={setShowModal} />
            ) : null}
        </>
    );
};

export default Task;
