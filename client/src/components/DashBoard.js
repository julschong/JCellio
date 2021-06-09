import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from 'reactstrap';
import Store from '../helper/Store';
import { FETCH } from '../helper/url';
import { useLocalStorage } from '../hooks/useLocalStorage';
import BoardSelect from './BoardSelect';
import MainBoard from './MainBoard';

const DashBoard = () => {
    const [token] = useLocalStorage('token');
    const [selection, setSelection] = useState({
        selectedIndex: 0,
        visible: false
    });
    const { data, isLoading, refetch } = useQuery(
        'boards',
        () =>
            fetch(`${FETCH.BASE_URL}/boards`, {
                headers: { Authorization: token }
            })
                .then((res) => res.json())
                .then((res) => res.data),
        { enabled: false }
    );

    useEffect(() => {
        refetch();
    }, [selection, refetch]);

    return (
        <Container
            className="main-container d-flex flex-grow-1"
            style={{ maxWidth: '85vw' }}
        >
            {isLoading ? (
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
                        refetch={refetch}
                    />
                    <Store>
                        <MainBoard
                            selectedIndex={selection.selectedIndex}
                            data={data}
                            loading={isLoading}
                        />
                    </Store>
                </Container>
            )}
        </Container>
    );
};

export default DashBoard;
