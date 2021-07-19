import axios from 'axios';
export const serverURL = `/server`;

export const loginUser = async (request) => {
    try {
        const result = await axios.post(`${serverURL}/login`, request);
        return result.data;

    } catch (err) {
        const error = new Error("Unable to login")
        throw error;
    }
};

export const subscribe = async (request) => {
    try {
        const result = await axios.post(`${serverURL}/subscribe`, request);
        return result.data;

    } catch (err) {
        const error = new Error("Unable to login")
        throw error;
    }
};

export const logout = async (token, isAdmin) => {
    try {
        await axios.post(`${serverURL}/logout`, { token, isAdmin });
    } catch (err) {
        throw err;
    }


};