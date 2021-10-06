import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from 'reactstrap';
import BoardService from '../services/boardService';
import BoardSelect from './BoardSelect';
import MainBoard from './MainBoard';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const DashBoard = () => {
    const [selection, setSelection] = useState(null);
    const [showSideBar, setShowSideBar] = useState(false);

    const { data, isLoading, refetch } = useQuery(
        'boards',
        () =>
            BoardService.getBoards()
                .then((res) => res.json())
                .then((res) => {
                    if (res.error === 'Incorrect credential') {
                        window.localStorage.removeItem('token');
                        window.location.reload();
                    }
                    return res.data;
                }),
        { enabled: false }
    );

    const [board, setBoard] = useState(null);

    useEffect(() => {
        refetch();
    }, [selection, refetch]);

    useEffect(() => {
        if (data && data.length > 0 && !selection) {
            setBoard(data[0]);
            setSelection(data[0].id);
        } else if (data) {
            setBoard(data.find((board) => board.id === selection));
        }
    }, [data, selection]);

    return (
        <Container
            className="main-container d-flex flex-grow-1"
            style={{ maxWidth: '85vw' }}
        >
            {isLoading ? (
                <h2>
                    <AiOutlineLoading3Quarters
                        className="loading-icon"
                        size="10%"
                    />
                </h2>
            ) : (
                <Container
                    className="main-board container mt-3 animate__animated animate__fadeIn"
                    style={{ maxWidth: '85vw' }}
                >
                    <BoardSelect
                        selection={selection}
                        setSelection={setSelection}
                        data={data}
                        refetch={refetch}
                        showSideBar={showSideBar}
                        setShowSideBar={setShowSideBar}
                    />
                    <MainBoard
                        selectedIndex={selection}
                        data={data}
                        board={board}
                        loading={isLoading}
                    />
                </Container>
            )}
        </Container>
    );
};

export default DashBoard;
