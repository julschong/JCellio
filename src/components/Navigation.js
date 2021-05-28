import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const Navigation = () => {
    return (
        <Navbar
            className="border-bottom p-3"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
            <NavbarBrand>JulsChong</NavbarBrand>
            <Nav
                className="mr-auto d-flex flex-nowrap flex-row flex-grow-1 flex-gap-1"
                style={{ color: 'white' }}
                navbar
            >
                <NavItem>
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Dashboard</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
