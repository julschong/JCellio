import { useCallback, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import './ProfileDropdown.css';
import ProfileDropDownColorSelect from './ProfileDropDownColorSelect';

const ProfileDropdown = ({
    authed,
    token,
    setToken,
    showProfile,
    setShowProfile
}) => {
    const visible = showProfile
        ? {
              opacity: 1
          }
        : {
              opacity: 0,
              top: 0,
              visibility: 'hidden'
          };

    const ref = useRef();

    const handleClick = useCallback(
        (e) => {
            if (
                !ref.current.contains(e.target) &&
                !e.target.className.includes('icon')
            ) {
                setShowProfile(false);
            }
        },
        [setShowProfile]
    );

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return (
        <div
            className="profile-dropdown position-absolute d-flex flex-column"
            style={{ ...visible, color: 'black' }}
            ref={ref}
        >
            <p>Logged in as {authed.name} </p>
            <p>background color</p>
            <ProfileDropDownColorSelect />
            {token ? (
                <Button onClick={() => setToken(null)}>Logout</Button>
            ) : null}
        </div>
    );
};

export default ProfileDropdown;
