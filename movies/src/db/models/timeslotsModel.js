const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    theater: { type: String },
    slots: [],
    hasOpenSeats: { type: Boolean },
    name: { type: String },
});


timeslotSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    userObject.id = userObject._id.toString();

    return userObject;
};

const TimeSlot = mongoose.model('TimeSlot', timeslotSchema);

module.exports = TimeSlot;