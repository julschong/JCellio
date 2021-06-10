import { useState } from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import './Navigation.css';
import ProfileDropdrown from './ProfileDropdrown';

const Navigation = ({ token, setToken, authed }) => {
    const [showProfile, setShowProfile] = useState(false);
    return (
        <Navbar>
            <h1>JCellio</h1>
            <Nav className="mr-auto d-flex" style={{ color: 'white' }} navbar>
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
                <div className="profile-group position-relative">
                    <div
                        className="profile-icon"
                        onClick={() => setShowProfile((prev) => !prev)}
                    >
                        <p>{authed.name.slice(0, 1)}</p>
                    </div>
                    <ProfileDropdrown
                        authed={authed}
                        token={token}
                        setToken={setToken}
                        showProfile={showProfile}
                        setShowProfile={setShowProfile}
                    />
                </div>
            ) : null}
        </Navbar>
    );
};

export default Navigation;
