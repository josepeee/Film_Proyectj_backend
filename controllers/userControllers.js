
const User = require("../models/userModels");
const bcrypt = require("bcrypt"); // una libreria que nos ayuda encriptar las contraseñas..
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/util");
const { error } = require("console");
const movies = require("../models/moviesModels");
const { ADDRGETNETWORKPARAMS } = require("dns");


//se utiliza para registrar nuevos usuarios
const addUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      age: age,
      role: role,
    });

    await user.save();


    res.status(200).json({ status: "succeeded", data: user });
  } catch (error) {
    if (error.code === 1100) {
      return res.status(200).json({
        status: "Error",
        message: "El email ya existe",
      });
    }
    res.status(400).json({
      status: "Error",
      message: "No se pudo crear el usuario",
      error: error.message,
    });

  }
};

// se utiliza para autenticar a los usuarios que intentan iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Buscamos por email si existe en la base de datos
    const user = await User.findOne({ email: email });
    //En el caso de que si entramos en el if, si no, devolvemos el mensaje por else 
    if (user) {
      //comparamos contraseñas y si nos devuleve un true, esque no es correcto
      // de lo contrario nos devulve un false y manda el mensaje
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        //TODO: GENERAR TOKEN

        const payload = {
          userId: user._id,
          nombre: user.name,
          email: user.email,
          role: user.role,

        };
        const token = generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        return res.status(200).json({
          status: "succeeded",
          data: user,
          token: token,
          token_refresh: token_refresh,
        });
      } else {
        return res.status(200).json({
          status: "Error",
          message: "Email y contraseña no coinciden",
        });
      }
    } else {
      res.status(200).json({
        status: "Error",
        message: "Email y contraseña no coinciden",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se ha podido hacer login",
      error: error.message
    });
  };
};

const refreshToken = (req, res) => {
  try {
    const payload = req.payload;
    if (!payload) return res.status(401).json({ error: "Access denied" });
    const user = {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,

    };
    const token = generateToken(user, false);
    const token_refresh = generateToken(user, true);

    res.status(200).json({
      status: "succeeded",
      data: {
        token,
        token_refresh,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Expired Token",
      error: error.message
    });
  }
};

//obtener las lista de peliculas favoritas del usuario
const getUserFavoriteMovies = async (req, res) => {
  try {
      // la información de autenticación del usuario
      const userId = req.payload.userId; // acceder al ID del usuario desde la información de autenticación

      // las películas favoritas del usuario en la base de datos
      const userFavorites = await User.findById(userId)

      // Verificar si el usuario tiene películas favoritas
      if (!userFavorites || userFavorites.favorites.length === 0) {
          return res.status(200).json({
              status: 'success',
              message: 'El usuario no tiene películas favoritas',
              data: []
          });
      }

      // Si el usuario tiene películas favoritas, las devuelves en la respuesta
      res.status(200).json({
          status: 'success',
          message: 'Lista de películas favoritas del usuario',
          data: userFavorites.favoriteMovies
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: 'Error al obtener las películas favoritas del usuario',
          error: error.message
      });
  }
};

// para añadir peliculas a favoritos
const postMoviesFavorites = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const movieId = req.params.id;
    
    const user = await User.findById(userId);

    if(user.favorites.includes(movieId) === true){
      return res.status(200).json({
        status: "error",
        message: "La pelicula ya esta añadida a favoritos"
      })
    }
    user.favorites.push(movieId);
    await user.save();
    
    return res.status(200).json({
      status: "success",
      data: user,
    })
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "error al añadir a favoritos",
        error: error.message,
      })
    }
};
 
//para borrar peliculas de favoritos

const deleteMoviesFavorite = async (req, res) => {
  try{ 
    const movieId = req.params.id
    const userId = req.payload.userId;
    const user = await User.findById(userId);
    user.favorites.pull(movieId);
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    })

  } catch (error) {
        res.status(400).json({
          status: "error",
          message: "error no al borrar de favoritos",
          error: error,message,
        })
  }
};

module.exports = { addUser, login, refreshToken, postMoviesFavorites, deleteMoviesFavorite, getUserFavoriteMovies}


// https://api.themoviedb.org/3//movie/now_playing?language=es-ES&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&page=1