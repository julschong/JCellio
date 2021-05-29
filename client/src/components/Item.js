import { Draggable } from 'react-beautiful-dnd';

const Item = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id} index={index}>
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
                        {item.content}
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Item;
