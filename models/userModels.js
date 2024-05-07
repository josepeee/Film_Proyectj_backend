
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
  favorites: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movie'
    }],
    default: [] // Valor predeterminado: una lista vacía de favoritos nos ayuda a crear un usuario sin añadir el este campo.
  }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
