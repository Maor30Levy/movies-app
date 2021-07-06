export const initialHoursData = {
    hours: []
};


const SlotHoursReducer = (hoursData, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...hoursData,
                hours: action.hours
            };
        default:
            return { ...hoursData };

    }
};


export default SlotHoursReducer;