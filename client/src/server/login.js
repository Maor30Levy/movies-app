export const loginUser = (request) => {
    return { user: "avi", token: "111" };
};

export const subscribeUser = (request) => {
    return request;
};

export const subscribeAdmin = (request) => {
    console.log(request)
    return request;
};