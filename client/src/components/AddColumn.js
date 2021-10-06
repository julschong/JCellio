import { useContext } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { StoreContext } from '../helper/Store';

const AddColumn = ({ addColumn }) => {
    const { addingColumn, setAddingColumn } = useContext(StoreContext);

    return (
        <div className="add-column p-2 animate__animated animate__fadeIn">
            {addingColumn ? (
                <Form
                    className="p-2"
                    style={{
                        height: 'auto',
                        background: 'lightgrey',
                        borderRadius: '5px'
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (e.target[0].value.trim() === '') {
                            return;
                        }
                        addColumn(e.target[0].value.trim());
                        e.target[0].value = '';
                    }}
                >
                    <FormGroup>
                        <Input
                            className="mb-2 p-2 item"
                            type="textarea"
                            name="card-content"
                            id="content"
                            placeholder="Enter list title..."
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '5px'
                            }}
                            spellCheck={false}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setAddingColumn(false);
                                    if (e.target.value.trim() === '') {
                                        return;
                                    }
                                    addColumn(e.target.value.trim());
                                    e.target.value = '';
                                }
                            }}
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
                                    setAddingColumn(false);
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
            ) : (
                <button onClick={() => setAddingColumn(true)} href="#">
                    + Add another card
                </button>
            )}
        </div>
    );
};

export default AddColumn;
