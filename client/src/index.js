import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ThemeStore from './helper/ThemeStore';

ReactDOM.render(
    <ThemeStore>
        <App />
    </ThemeStore>,
    document.getElementById('root')
);
