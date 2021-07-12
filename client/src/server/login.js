import axios from 'axios';
const serverHost = process.env.REACT_APP_SERVER_HOST;
const serverPort = process.env.REACT_APP_SERVER_PORT;
export const serverURL = `${serverHost}:${serverPort}`;

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