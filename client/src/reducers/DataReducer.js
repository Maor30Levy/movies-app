export const initialData = {
    adminsData: [],
    moviesData: [],
    availabilityData: [],
    theatersData: [],
    locationsData: [],
    newsData: [],
    isLoaded: false
};

const getData = (data) => {
    const result = {};
    for (let key in data) {
        if (!!data[key]) result[key] = data[key]
    }
    return result
}

const DataReducer = (data, action) => {
    switch (action.type) {

        case "SET_DATA":
            const newData = getData(action.data);
            return {
                ...data,
                ...newData
            };


        default:
            return { ...data };

    }
};


export default DataReducer;