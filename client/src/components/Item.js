import { Draggable } from 'react-beautiful-dnd';

const Item = ({ task, index, taskId }) => {
    return (
        <Draggable draggableId={String(taskId)} index={index} key={taskId}>
            {(provided, snapshot) => {
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
                        {task ? task.name : null}
                        {'      ID  ' + taskId}
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Item;
