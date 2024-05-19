const { addUser, login, refreshToken, postMoviesFavorites, deleteMoviesFavorite, getUserFavoriteMovies, addMovie, 
       updateMovie,
       deleteMovie,
} = require("../controllers/userControllers");
const {verifyToken, verifyRole} = require("../middlewares/auth");
const router = require("express").Router();

router.post("/signup", addUser);
router.post("/login", login);


/**
 * @swagger
 * /movies:
 *    post:
 *         sumary: añadir peliculas a favoritos.
 *         desciption: Añadimos una pelicula a favoritos
 *         requestBody:
 *            requiered:true
 *             contend: 
 *                application/json:
 *                    schema:
 *                      type:object
 *                      properties:
 *                          id:
 *                            type:string
 *                             description:Id de la pelicula
 *                          title: 
 *                             type:string
 *                              description:titulo de la pelicula
 *                          description:
 *                               type:string
 *                                description:Description de la pelicula
 *                           posterUrl:
 *                               type:string
 *                                description:Poster de  la pelucula
 *                           date: 
 *                                 type:string 
 *                                  description:Fecha de la pelicula
 *         response:
 *            201:
 *              description: se a añadido correctamente la pelicula
 *            400: 
 *               description: Ha fallado la peticion de añadir pelicula
 */
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