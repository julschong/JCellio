import { Redirect, Route } from 'react-router';

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authed !== false ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login'
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
