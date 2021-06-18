import React, { createContext, useReducer } from 'react';
import UserReducer, { initialUserData } from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userData, userDataDispatch] = useReducer(UserReducer, initialUserData);
    return (
        <UserContext.Provider value={{ userData, userDataDispatch }}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;