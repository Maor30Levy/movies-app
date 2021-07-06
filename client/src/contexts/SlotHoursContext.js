import React, { createContext, useReducer } from 'react';
import SlotHoursReducer, { initialHoursData } from '../reducers/SlotHoursReducer';

export const SlotHoursContext = createContext();

const SlotHoursContextProvider = (props) => {
    const [hoursData, hoursDataDispatch] = useReducer(SlotHoursReducer, initialHoursData);
    return (
        <SlotHoursContext.Provider value={{ hoursData, hoursDataDispatch }}>
            {props.children}
        </SlotHoursContext.Provider>
    )
};

export default SlotHoursContextProvider;