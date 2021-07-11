const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { keys } = require('../../keys/keys');
const { jwtSecret } = keys;
const userSchema = new mongoose.Schema({
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

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
};

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, jwtSecret)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
};

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);

    next()
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Unable to login');

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;