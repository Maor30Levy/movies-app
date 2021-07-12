import React, { createContext, useReducer } from 'react';
import DataReducer, { initialData } from '../reducers/DataReducer';

export const DataContext = createContext();

const DataContextProvider = (props) => {
    const [contentData, contentDataDispatch] = useReducer(DataReducer, initialData);
    return (
        <DataContext.Provider value={{ contentData, contentDataDispatch }}>
            {props.children}
        </DataContext.Provider>
    )
};

export default DataContextProvider;