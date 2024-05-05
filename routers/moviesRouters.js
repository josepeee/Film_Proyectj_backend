const router = require("express").Router();
const {
    getetALLMovies,
    getMoviesByd,
    getRecentMovies,
    getMostPopularMovies,
} = require("../controllers/movies.controllers");
const { refreshToken } = require("../controllers/userControllers");
const verifyToken = require("../middlewares/auth");

//Escuchar peticiones GET
router.get("/", verifyToken , getetALLMovies, refreshToken);
//Obtener documentos por ID para sacar los detalles de la pelicula
router.get("/:id", getMoviesByd); //quitar el id  y sacarlo por el peyload
//Para obtener las 10 peliculas insertadas recientementes
router.get("/", getRecentMovies);
//obtener las 10 peliculas mejor valoradas
router.get("/", getMostPopularMovies);

module.exports = router;
