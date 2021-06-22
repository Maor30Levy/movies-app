import React, { createContext, useReducer } from 'react';
import ModalReducer, { initialModalData } from '../reducers/ModalReducer';

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
    const [modalData, modalDataDispatch] = useReducer(ModalReducer, initialModalData);
    return (
        <ModalContext.Provider value={{ modalData, modalDataDispatch }}>
            {props.children}
        </ModalContext.Provider>
    )
};

export default ModalContextProvider;