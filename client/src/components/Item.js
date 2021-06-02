import { Draggable } from 'react-beautiful-dnd';

const Item = ({ task, index, taskId }) => {
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
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            userSelect: 'none',
                            padding: 8,
                            margin: '0 0 8px 0',
                            minHeight: '25px',
                            backgroundColor: snapshot.isDragging
                                ? '#263B4A'
                                : '#FFF',
                            color: '#777',
                            borderRadius: '5px',
                            ...provided.draggableProps.style
                        }}
                    >
                        <span className="text-break">
                            {formattedTaskName}
                            {'      ID  ' + taskId}
                        </span>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Item;
