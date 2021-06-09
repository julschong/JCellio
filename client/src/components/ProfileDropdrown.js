import { Button } from 'reactstrap';
import './ProfileDropdrown.css';

const ProfileDropdrown = ({
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
            style={visible}
        >
            <p>Logged in as {authed.name} </p>
            {token ? (
                <Button onClick={() => setToken(null)}>Logout</Button>
            ) : null}
        </div>
    );
};

export default ProfileDropdrown;
