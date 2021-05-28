import { Form, FormGroup, Input } from 'reactstrap';

const AddItem = () => {
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target[0].value.trim());

                if (e.target[0].value.trim() === '') {
                    return;
                }
            }}
        >
            <FormGroup>
                <Input
                    className="mb-2 p-2"
                    type="textarea"
                    name="card-content"
                    id="content"
                    placeholder="content"
                    style={{ backgroundColor: 'white', borderRadius: '5px' }}
                    spellCheck={false}
                />
            </FormGroup>
            <FormGroup>
                <Input type="submit" value="Add Card" />
            </FormGroup>
        </Form>
    );
};

export default AddItem;
