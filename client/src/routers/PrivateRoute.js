import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../contexts/UserContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext);

    return (
        <Route
            {...rest}
            component={(props) => (
                userData.loggedIn ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/login", state: { needToLogin: true } }} />
            )}
        />);
};

export default PrivateRoute;
