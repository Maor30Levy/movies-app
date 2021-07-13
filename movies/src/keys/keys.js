const keys = {
    port: process.env.PORT,
    mongodbHost: process.env.MONGODB_SERVICE_SERVICE_HOST,
    mongodbPort: process.env.MONGODB_SERVICE_SERVICE_PORT,
    jwtSecret: process.env.JWT_SECRET,

}

module.exports = { keys };