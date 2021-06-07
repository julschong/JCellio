import { Draggable } from 'react-beautiful-dnd';
import './Task.css';

const Task = ({ task, index, taskId, columnId, deleteTask }) => {
    return (
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
                        <span className="text-break">{formattedTaskName}</span>
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
    );
};

export default Task;
