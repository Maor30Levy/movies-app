export const loginAction = (user) => ({
    type: "LOGIN",
    user
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