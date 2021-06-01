import { Button, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const Navigation = ({ token, setToken, authed }) => {
    return (
        <Navbar style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <NavbarBrand>JulsChong</NavbarBrand>
            <Nav
                className="mr-auto d-flex flex-nowrap flex-row flex-grow-1 flex-gap-1"
                style={{ color: 'white' }}
                navbar
            >
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>
                {!authed ? (
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                ) : null}
            </Nav>
            {token ? (
                <Button onClick={() => setToken(null)}>Logout</Button>
            ) : null}
        </Navbar>
    );
};

export default Navigation;
