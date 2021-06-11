import { useState } from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import './Navigation.css';
import ProfileDropdown from './ProfileDropdown';

const Navigation = ({ token, setToken, authed, fontColor }) => {
    const [showProfile, setShowProfile] = useState(false);
    return (
        <Navbar style={{ color: fontColor }}>
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
                        onClick={() => {
                            setShowProfile((prev) => !prev);
                        }}
                    >
                        <p className="icon">{authed.name.slice(0, 1)}</p>
                    </div>
                    <ProfileDropdown
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
