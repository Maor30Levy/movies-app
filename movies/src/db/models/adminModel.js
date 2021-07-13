const mongoose = require('mongoose');
const { keys } = require('../../keys/keys');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { jwtSecret } = keys;
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await Admin.findOne({ email });

    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Unable to login');

    return user;
};

adminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, jwtSecret)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
};

adminSchema.statics.checkPassword = async function (email, password) {
    const user = await Admin.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    return true;
};

adminSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    userObject.id = userObject._id.toString();

    delete userObject.password;
    delete userObject.tokens;

    return userObject
};

adminSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);

    next()
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;