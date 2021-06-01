import { useState } from 'react';
import { Container } from 'reactstrap';
import { FETCH } from '../helper/url';
import useFetch from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import BoardSelect from './BoardSelect';
import MainBoard from './MainBoard';

const DashBoard = () => {
    const [token] = useLocalStorage('token');

    const { data, loading, error } = useFetch(
        `${FETCH.BASE_URL}/boards`,
        token
    );

    const [selection, setSelection] = useState({
        selectedIndex: 0,
        visible: false
    });

    return (
        <Container
            className="main-container d-flex flex-grow-1"
            style={{ maxWidth: '85vw' }}
        >
            {loading ? (
                <h2>Loading</h2>
            ) : (
                <Container
                    className="main-board container mt-3"
                    style={{ maxWidth: '85vw' }}
                >
                    <BoardSelect
                        selection={selection}
                        setSelection={setSelection}
                        data={data}
                    />
                    <MainBoard
                        selectedIndex={selection.selectedIndex}
                        data={data}
                        loading={loading}
                    />
                </Container>
            )}
        </Container>
    );
};

export default DashBoard;
