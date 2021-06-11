import { useContext } from 'react';
import { ThemeContext } from '../helper/ThemeStore';
import './ProfileDropDownColorSelect.css';

const ProfileDropDownColorSelect = () => {
    const {
        storedColor,
        setStoredColor,
        currentColor,
        setCurrentColor,
        themes
    } = useContext(ThemeContext);

    const chooseColor = (theme) => {
        setCurrentColor(theme);
        setStoredColor(theme);
    };

    console.log(themes['white'].hex);

    return (
        <div className="color-select">
            {Object.keys(themes).map((key) => (
                <div
                    className="color-option"
                    key={themes[key].hex}
                    style={{ backgroundColor: themes[key].hex }}
                    onClick={() => chooseColor(themes[key])}
                ></div>
            ))}
        </div>
    );
};

export default ProfileDropDownColorSelect;
