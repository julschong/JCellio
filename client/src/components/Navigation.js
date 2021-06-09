import { Button, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import './Navigation.css';

const Navigation = ({ token, setToken, authed }) => {
    return (
        <Navbar
            style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                paddingInline: '30px'
            }}
        >
            <h1>JCellio</h1>
            <Nav
                className="mr-auto d-flex flex-nowrap flex-row flex-grow-1 flex-gap-1"
                style={{ color: 'white' }}
                navbar
            >
                <NavItem>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>
                {!authed ? (
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                ) : null}
            </Nav>
            {authed ? (
                <div className="profile-icon">
                    <p>{authed.name.slice(0, 1)}</p>
                </div>
            ) : null}
            {token ? (
                <Button onClick={() => setToken(null)}>Logout</Button>
            ) : null}
        </Navbar>
    );
};

export default Navigation;
