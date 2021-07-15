const mongoose = require('mongoose');
const TimeSlot = require('./timeslotsModel');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    ratings: {
        critics: {
            type: Number,
            required: true
        },
        audience: {
            type: Number,
        },
        numOfRatings: {
            type: Number,
            default: 0
        },
    },
    description: {
        type: String,
        required: true
    },
    comments: [
        {
            user: { type: String },
            comment: { type: String },
            id: { type: String },
        }

    ],
    picture: {
        type: String,
    }


});


movieSchema.pre('remove', async function (next) {
    const movie = this
    await TimeSlot.deleteMany({ owner: movie._id })
    next()
});

movieSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    userObject.id = userObject._id.toString();

    return userObject;
};

movieSchema.virtual('timeslots', {
    ref: 'TimeSlot',
    localField: '_id',
    foreignField: 'owner'
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;