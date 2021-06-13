import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './helper/Store';
import ThemeStore from './helper/ThemeStore';

ReactDOM.render(
    <ThemeStore>
        <Store>
            <App />
        </Store>
    </ThemeStore>,
    document.getElementById('root')
);
