const router = require("express").Router();
const {
    getetALLMovies,
    getMoviesByd,
    getRecentMovies,
    getMostPopularMovies,
    
   
} = require("../controllers/movies.controllers");
const { refreshToken } = require("../controllers/userControllers");
const { verifyToken, verifyRole } = require("../middlewares/auth");
/**
 * @swagger
 * /movies:
 *    get:
 *        sumary: Obtine todas las peliculas
 *        description : Obtiene la collection comppleta de peliculas
 *        responses: 
 *           200:
 *              description: Odtiene las peliculas correctamene
 *           400: 
 *               description: Ha fallado la peticion de obtener moviles
 */
// Obtener todas las peliculas
router.get("/", getetALLMovies); // funcina
//Para obtener las 10 peliculas insertadas recientementes
router.get("/movies_recent", getRecentMovies);//funciona
//obtener las 10 peliculas mejor valoradas lo sacamos cuando tenga comentarios
  router.get("/most_popular", getMostPopularMovies); // ("Este no esta echo")____________
/**
 * @swagger
 * movies/{id}:
 *    get:
 *        sumary: Obtine las peliculas por id
 *        description : Obtiene unas sola  pelicula
 *        parameters:
 *          - in: path 
 *            name: id
 *            requierd: true
 *            description: Id del producto
 *            schema:
 *               type: string
 *        responses: 
 *           200:
 *              description: Obtiene las peliculas correctamene
 *           204:
 *               description: Respuesta correcta pero no hay peliculas
 *           400: 
 *               description: Ha fallado la peticion de obtener peliculas
 */
// Obtener los detalles de la pelicula
router.get("/:id", getMoviesByd); //funciona 

module.exports = router;
