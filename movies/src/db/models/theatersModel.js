const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    movies: [{ type: String }],
    seats: {
        type: Number,
        required: true,
    },

});




theaterSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    userObject.id = userObject._id.toString();

    return userObject;
};



const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;