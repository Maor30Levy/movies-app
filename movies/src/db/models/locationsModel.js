const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

});


locationSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()


    return userObject.location;
};



const Location = mongoose.model('Location', locationSchema);

module.exports = Location;