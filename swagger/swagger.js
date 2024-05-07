const swaggerJSDoc = require("swagger-jsdoc");
const { serve } = require("swagger-ui-express");

const options = {
    swaggerDefinition : {
        openapi:'3.0.0',
        info: {
            title:"Peliculas",
            version: "1.0.0",
            description: "Descripcion de la api",
        },
        server: {
            url:"http://localhost:5000",
            description:"servidor local",
        },
    },
    apis:[".routers/*.js"],
};

const swaggerSepc = swaggerJSDoc(options);

module.exports = swaggerSepc;