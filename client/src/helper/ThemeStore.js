import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = React.createContext(null);

const ThemeStore = ({ children }) => {
    const themes = Object.freeze({
        blue: { hex: '#084999', fontColor: 'white' },
        darkBlue: { hex: '#122A52', fontColor: 'white' },
        lightBlue: { hex: '#1099E0', fontColor: 'white' },
        purple: { hex: '#875F9A', fontColor: 'white' },
        lightGreen: { hex: '#1FE0C4', fontColor: 'white' },
        lightGray: { hex: '#D6D5D7', fontColor: 'white' },
        white: { hex: '#FFFFFF', fontColor: 'white' }
    });

    const [storedColor, setStoredColor] = useLocalStorage('color');

    const [currentColor, setCurrentColor] = useState(themes.darkBlue);

    if (!storedColor) {
        setStoredColor(themes.darkBlue);
    }

    const store = {
        storedColor,
        setStoredColor,
        currentColor,
        setCurrentColor,
        themes
    };

    return (
        <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
    );
};

export default ThemeStore;
