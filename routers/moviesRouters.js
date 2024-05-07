const router = require("express").Router();
const {
    getetALLMovies,
    getMoviesByd,
    getRecentMovies,
    getMostPopularMovies,
    getUserFavoriteMovies

} = require("../controllers/movies.controllers");
const { refreshToken } = require("../controllers/userControllers");
const {verifyToken , verifyRole }= require("../middlewares/auth");

// Sacar el listado de peñiculas
router.get("/", getetALLMovies);

//Obtener documentos por ID para sacar los detalles de una pelicula
router.get("/:id", getMoviesByd); //quitar el id  y sacarlo por el peyload

//Para obtener las 10 peliculas insertadas recientementes
router.get("/movies_recent", getRecentMovies);

//obtener las 10 peliculas mejor valoradas
router.get("/most_popular", getMostPopularMovies);

router.get("/user/favorite",verifyToken, verifyRole, getUserFavoriteMovies,)
module.exports = router;
