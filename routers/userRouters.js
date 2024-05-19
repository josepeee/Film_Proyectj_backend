const { addUser, login, refreshToken, postMoviesFavorites, deleteMoviesFavorite, getUserFavoriteMovies, addMovie, 
       updateMovie,
       deleteMovie,
} = require("../controllers/userControllers");
const {verifyToken, verifyRole} = require("../middlewares/auth");
const router = require("express").Router();

router.post("/signup", addUser);
router.post("/login", login);
// Añadir peliculas a favoritos
router.post("/:id/favorite",verifyToken, postMoviesFavorites);
// Borrar peliculas de favoritos
router.delete("/:id/favorite", verifyToken, deleteMoviesFavorite);
//añadir peliculas solos administrados 
router.post("/", verifyToken, addMovie)
// para borrar peliculas solos los administradores
router.delete("movies/:id",  verifyRole, deleteMovie)
// para actualizar peliculas los administradores
router.patch("/movies/:id", verifyToken, updateMovie)

router.get("/refreshToken", verifyToken, refreshToken);

//obtener las lista de peliculas favoritas del usuario
router.get("/user/favorite",verifyToken, verifyRole, getUserFavoriteMovies); //funciona 

module.exports = router;