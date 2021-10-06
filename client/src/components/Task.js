import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StoreContext } from '../helper/Store';
import { ThemeContext } from '../helper/ThemeStore';
import './Task.css';

const Task = ({ task, index, taskId, columnId }) => {
    const { deleteTask, setChangeTaskModel } = useContext(StoreContext);
    const { themes } = useContext(ThemeContext);
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
                        className="task animate__animated animate__fadeIn"
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
                        <div
                            className="color-pill"
                            style={{
                                backgroundColor: task.color
                                    ? themes[task.color].hex
                                    : undefined
                            }}
                        ></div>
                        <p
                            className="text-break p-0 m-0"
                            onClick={() => setChangeTaskModel(taskId)}
                        >
                            {formattedTaskName}
                        </p>
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
