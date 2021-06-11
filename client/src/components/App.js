import jwt from 'jsonwebtoken';
import React, { useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { ThemeContext } from '../helper/ThemeStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './App.css';
import DashBoard from './DashBoard';
import Login from './Login';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import Register from './Register';

// use React Query to fetch data from backend
const queryClient = new QueryClient();

const App = () => {
    // fetch token from local storage
    const [token, setToken] = useLocalStorage('token', null);

    // authed check if token is valid
    const authed = useMemo(() => {
        if (token) {
            try {
                return jwt.verify(
                    token.replace(/^[Bb]earer[\w=]/, ''),
                    process.env.REACT_APP_SECRET
                );
            } catch (error) {
                console.error('token invalid', error);
                setToken(null);
            }
        }
        return token !== null;
    }, [token, setToken]);

    // get themecolor
    const { storedColor } = useContext(ThemeContext);

    return (
        <div
            className="app-container"
            style={{ backgroundColor: storedColor.hex }}
        >
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Navigation
                        token={token}
                        setToken={setToken}
                        authed={authed}
                        fontColor={storedColor.fontColor}
                    />
                    <main className="d-flex flex-column position-relative">
                        <Switch>
                            <Redirect exact path="/" to="/dashboard" />

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
            </QueryClientProvider>
        </div>
    );
};

export default App;
