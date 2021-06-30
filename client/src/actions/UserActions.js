export const loginAction = (user, isAdmin) => ({
    type: "LOGIN",
    user,
    isAdmin
});

export const logoutAction = () => ({
    type: "LOGOUT"
});

export const setHeaderAction = (activeHeader) => ({
    type: "HEADER",
    activeHeader
});

export const setWindowAction = (windowWidth) => ({
    type: "WINDOW",
    windowWidth
});

export const setLocationAction = (location) => ({
    type: "SET_LOCATION",
    location
});