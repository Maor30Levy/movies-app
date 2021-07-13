const mongoose = require('mongoose');
const { keys } = require('../../keys/keys');

const newsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    }
});


newsSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()
    userObject.id = userObject._id.toString();

    return userObject;
};



const News = mongoose.model('News', newsSchema);

module.exports = News;