import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

const Column = ({ columnId, column }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div style={{ margin: 8 }}>
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
                                    padding: 10,
                                    width: 250,
                                    minHeight: 500,
                                    borderRadius: '5px'
                                }}
                            >
                                <h2 className="font-size-1.2em">
                                    {column.name}
                                </h2>
                                {column.items.map((item, index) => {
                                    return (
                                        <Item
                                            item={item}
                                            index={index}
                                            key={item.id}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        </div>
    );
};

export default Column;
