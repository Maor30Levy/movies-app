export const initialUserData = {
    loggedIn: false,
    activeUser: '',
    token: '',
    avatar: null,
    activeHeader: false,
    windowWidth: null,

};

const UserReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...userData,
                loggedIn: true,
                activeUser: action.user.user,
                token: action.user.token,
                avatar: action.user.avatar
            };
        case "HEADER":
            return {
                ...userData,
                activeHeader: action.activeHeader
            };
        case "WINDOW":
            return {
                ...userData,
                windowWidth: action.windowWidth
            };
        case "LOGOUT":
            return {
                ...userData,
                loggedIn: false,
                activeUser: '',
                token: '',
                avatar: null
            };
        default:
            return { ...userData };

    }
};


export default UserReducer;