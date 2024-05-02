
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie' // Suponiendo que 'Movie' es el modelo de mongoose para las películas
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
