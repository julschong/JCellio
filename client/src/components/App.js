import { Container } from 'reactstrap';
import './App.css';
import Navigation from './Navigation';
import MainBoard from './MainBoard';

function App() {
    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <Navigation />
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
        </div>
    );
}

export default App;
