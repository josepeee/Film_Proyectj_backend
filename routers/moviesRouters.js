const router = require("express").Router();
const {
    getetALLMovies,
    getMoviesByd,
    getRecentMovies,
    getMostPopularMovies,
    getUserFavoriteMovies

} = require("../controllers/movies.controllers");
const { refreshToken } = require("../controllers/userControllers");
const { verifyToken, verifyRole } = require("../middlewares/auth");

// Sacar el listado de peliculas
router.get("/", getetALLMovies); // funcina

//Para obtener las 10 peliculas insertadas recientementes
router.get("/movies_recent", getRecentMovies);//funciona


//obtener las 10 peliculas mejor valoradas lo sacamos cuando tenga comentarios
router.get("/most_popular", getMostPopularMovies);

// /Obtener documentos por ID para sacar los detalles de una pelicula
router.get("/:id", getMoviesByd); //funciona 

//obtener las lista de peliculas favoritas del usuario
router.get("/user/favorite",verifyToken, verifyToken, getUserFavoriteMovies);

// para añadir peliculas a favoritos
router.post("/user/:idMovie/favorite",)

module.exports = router;
