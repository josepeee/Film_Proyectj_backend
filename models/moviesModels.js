const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    posterUrl: {
        type: String,
        require: true,
    },
    date: {
        type: Number,
        require: true,
    },
    adult: Boolean

});

module.exports = mongoose.model('movie', movieSchema);