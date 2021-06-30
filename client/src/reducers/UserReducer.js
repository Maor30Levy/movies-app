export const initialUserData = {
    loggedIn: false,
    isAdmin: false,
    activeUser: '',
    location: '',
    token: '',
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
                isAdmin: action.isAdmin
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
                isAdmin: false
            };

        case "SET_LOCATION":
            return {
                ...userData,
                location: action.location
            };

        default:
            return { ...userData };

    }
};


export default UserReducer;