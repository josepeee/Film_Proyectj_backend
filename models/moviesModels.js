const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    title: {
        type: string,
        require: true,
    },
    description: {
        type: string,
        require: true,
    },
    posterUrl: {
        type: string,
        require: true,
    }, 
    adult:{
        
    }

});

module.exports = movies;