const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    adult: {
        type: Boolean,
        default: false, // Por defecto, se asume que la película no es para adultos
    },
    popularity: {
        type: Number,
        default: 0, // Por defecto, la popularidad es 0 si no hay comentarios
    },
    creationDate: {
        type: Date,
        default: Date.now, // Por defecto, la fecha de creación es la fecha actual
    },
    average: {
        type: Number,
        default: 0, // Por defecto, la puntuación media es 0 si no hay comentarios
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
