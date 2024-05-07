const Module = require("module");
const Movie = require("../models/moviesModels");
const mongoose = require('mongoose');




// Función asincrónica para obtener todas las peliculas
const getetALLMovies = async (req, res) => {
    try { 

       
        // Buscar todas las peliculas en la base de datos
        const movies = await Movie.find();

        // Imprimir en la consola las peliculas encontrados (opcional)
        console.log(movies);

        // Verificar si no se encontraron peliculas
        if (movies.length === 0) {
            // Enviar una respuesta con estado 200 indicando que no hay datos
            return res.status(200).json({
                status: "success",
                message: "No hay Peliculas",
            });
        }
        
        // Enviar una respuesta con estado 200 y las peliculas encontrados
        res.status(200.).json({
            status: "success",
            data: movies,
        });
    } catch (error) {
        // Manejar errores si la operación falla
        res.status(400).json({
            status: "Error",
            message: "No se pudo obtener las peliculas",
            error: error.message,
        });
    }
};

// Función asincrónica para obtener una película por su ID
const getMoviesByd = async (req, res) => {
    try {
        // Obtener el ID de la película de los parámetros de la solicitud
        const movieId = req.params.id;

        // Buscar la película en la base de datos por su ID
        const movie = await Movie.findById(movieId);

        // Verificar si no se encontró ninguna película con el ID proporcionado
        if (!movie) {
            // Enviar una respuesta con estado 200 indicando que no se encontró ninguna película
            return res.status(200).json({
                status: "success",
                message: "No hay película",
            });
        }

        // Imprimir en la consola la película encontrada (opcional)
        console.log(movie);

        // Enviar una respuesta con estado 200 y la película encontrada
        res.status(200).json({
            status: "success",
            data: movie,
        });
    } catch (error) {
        // Manejar errores si la operación falla
        res.status(400).json({
            status: "Error",
            message: "No se pudo obtener la película",
            error: error.message,
        });
    }
};

// Función para obtener las películas recientes
const getRecentMovies = async (req, res) => {
    try {
        // Buscar las 10 películas más recientes en la base de datos
        const recentMovies = await Movie.find().sort({ creationDate: -1 }).limit(10);

        // Verificar si no se encontraron películas recientes
        if (recentMovies.length === 0) {
            // Enviar una respuesta con estado 404 indicando que no se encontraron películas recientes
            return res.status(404).json({
                status: "error",
                message: "No se encontraron películas recientes",
            });
        }

        // Enviar una respuesta con estado 200 y las películas recientes
        res.status(200).json({
            status: "success",
            data: recentMovies,
        });
    } catch (error) {
        // Manejar errores si la operación falla
        res.status(500).json({
            status: "error",
            message: "Hubo un error al obtener las películas recientes",
            error: error.message,
        });
    }
};


// Funcion para obtener las 10 mejores peliculas mejor valoradas
const getMostPopularMovies = async (req, res) => {
    try {   const movies = await Movie.find().sort({ average: -1}).limit(10);
           
            if(movies.length === 0){
                return res.status(404).json({
                    status: "error",
                    message: "No se encontraton peliculas",
                });
            }
            res.status(200).json({
                status: "success",
                data: movies,
            });

    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "No se pudieron obtener las peliculas mejor valoradas",
            error: error.message,
        });

    }
};

//obtener las lista de peliculas favoritas del usuario
const getUserFavoriteMovies = async (req, res) => {
    try {
        // la información de autenticación del usuario
        const userId = req.user.id; // acceder al ID del usuario desde la información de autenticación
        
        // las películas favoritas del usuario en la base de datos
        const userFavorites = await User.findById(userId).select('favoriteMovies').populate('favoriteMovies');
        
        // Verificar si el usuario tiene películas favoritas
        if (!userFavorites || userFavorites.favoriteMovies.length === 0) {
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
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las películas favoritas del usuario',
            error: error.message
        });
    }
};

module.exports = {
    getetALLMovies,
    getMoviesByd,
    getRecentMovies,
    getMostPopularMovies,
    getUserFavoriteMovies
    
};
