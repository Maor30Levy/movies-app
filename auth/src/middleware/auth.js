const jwt = require('jsonwebtoken');
const User = require('../db/models/userModel');
const Admin = require('../db/models/adminModel');
const auth = async (req, res, next) => {
    try {
        const type = req.header('UserType');
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = type === "User" ?
            await User.findOne({ _id: decoded._id, 'tokens.token': token }) :
            await Admin.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) throw new Error()


        req.token = token;
        req.user = user;
        next()
    } catch (err) {
        return res.status(401).send({ message: 'Please authenticate.' });
    }
}

module.exports = auth;