import { useRef } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

const AddItem = ({ addItem, columnId, setAddingItem, addingItem }) => {
    const text = useRef();

    // useEffect(() => {
    //     console.log(text.current);

    //     text.current.focus();
    // }, [addingItem]);

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                if (e.target[0].value.trim() === '') {
                    return;
                }
                addItem(columnId, e.target[0].value.trim());
                e.target[0].value = '';
                setAddingItem(false);
            }}
        >
            <FormGroup>
                <Input
                    ref={text}
                    className="mb-2 p-2 item"
                    type="textarea"
                    name="card-content"
                    id="content"
                    placeholder="Enter a title for this card..."
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px'
                    }}
                    spellCheck={false}
                    autoFocus
                />
            </FormGroup>
            <div className="d-flex">
                <FormGroup className="flex-grow-1">
                    <button type="submit">Add a card</button>
                </FormGroup>
                <FormGroup>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setAddingItem(false);
                        }}
                        className="p-0"
                        style={{
                            width: '1em',
                            height: '100%',
                            fontSize: '2em',
                            lineHeight: '1.2'
                        }}
                    >
                        X
                    </button>
                </FormGroup>
            </div>
        </Form>
    );
};

export default AddItem;
