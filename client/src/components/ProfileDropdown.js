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
              opacity: 1,
              display: 'flex'
          }
        : {
              opacity: 0,
              top: 0,
              visibility: 'hidden'
          };

    return (
        <div
            className="profile-dropdown position-absolute d-flex flex-column"
            style={{ ...visible, color: 'black' }}
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
