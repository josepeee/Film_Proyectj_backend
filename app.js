const express = require("express");
const mongoose = require("mongoose");
// const moviesRoutes = require("./routers/moviesRoutes"); // Importar el enrutador de películas
// const userRoutes = require("./routers/userRoutes"); // Importar el enrutador de usuarios
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

const PORT = 5000;

const app = express();

app.use(express.json());

const urlMongoose = process.env.DATABASE_URL_DEV;

mongoose.connect(urlMongoose);


// Eventos de conexión de la base de datos
const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Error al conectar:", error); // Manejo de errores de conexión
});

db.once("connected", () => {
    console.log("Success conect"); // Mensaje de éxito cuando la conexión se establece
});

db.on("disconected", () => {
    console.log("mongoose default connection is disconnected"); // Mensaje cuando la conexión se desconecta
});


// app.use("/movies", moviesRoutes); // Rutas relacionadas con las películas
// app.use("/users", userRoutes); // Rutas relacionadas con los usuarios

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
