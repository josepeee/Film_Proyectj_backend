const router = require("express").Router();
const {
    getetALLMovies,
    getMoviesByd,
    createMovies,
    patchMovies,
    deleteMovies,
} = require("../controllers/movies.controllers");

//Escuchar peticiones GET
router.get("/", getetALLMovies);
//Obtener documentos por ID
router.get("/:id", getMoviesByd);
//Añadir documentos
router.post("/",createMovies);
//Actualizar documentos
router.patch("/id", patchMovies);
//Borrar un documento 
router.delete("/:id", deleteMovies);


module.exports = router;
