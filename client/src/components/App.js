import './App.css';
import { useMemo } from 'react';
import jwt from 'jsonwebtoken';
import env from 'react-dotenv';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import DashBoard from './DashBoard';

function App() {
    const [token, setToken] = useLocalStorage('token', null);

    const authed = useMemo(() => {
        if (token) {
            return jwt.verify(token.replace(/^[Bb]earer[\w=]/, ''), env.SECRET);
        }

        return token !== null;
    }, [token]);

    return (
        <Router>
            <Navigation token={token} setToken={setToken} authed={authed} />
            <main className="d-flex flex-column position-relative">
                <Switch>
                    <Route exact path="/" />

                    <PrivateRoute
                        path="/dashboard"
                        authed={authed}
                        component={DashBoard}
                    />

                    <Route path="/login">
                        <Login setToken={setToken} authed={authed} />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;
