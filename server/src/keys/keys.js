const keys = {
    port: process.env.PORT,
    authPort: process.env.AUTH_PORT,
    authHost: process.env.AUTH_HOST,
    usersPort: process.env.USERS_PORT,
    usersHost: process.env.USERS_HOST,
    moviesHost: process.env.MOVIES_HOST,
    moviesPort: process.env.MOVIES_PORT,
}

module.exports = { keys };