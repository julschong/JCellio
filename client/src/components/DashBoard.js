import { Container } from 'reactstrap';
import MainBoard from './MainBoard';

const DashBoard = () => {
    return (
        <Container
            className="main-container d-flex flex-grow-1"
            style={{ maxWidth: '85vw' }}
        >
            <Container
                className="main-board container mt-3"
                style={{ maxWidth: '85vw' }}
            >
                <MainBoard />
            </Container>
        </Container>
    );
};

export default DashBoard;
