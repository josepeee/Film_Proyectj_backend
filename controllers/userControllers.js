
const User = require("../models/userModels");
const bcrypt = require("bcrypt"); // una libreria que nos ayuda encriptar las contraseñas..
const jwt = require("jsonwebtoken");
const { generateToken } = require("../util")


//se utiliza para registrar nuevos usuarios
const addUser = async (req, res) => {
    try {
        const { name, email, password, age, role } = req.body;
        const user = new User({
            name: name,
            email: email,
            password: await bcrypt.hash(password,10),
            age: age,
            role: role,
        });

        await user.save();


        res.status(200).json({ status: "succeeded", data: user });
    } catch (error) {
        if (error.code === 1100) {
            return res.status(200).json({
                status: "Error",
                message: "El email ya existe",
            });
        }
        res.status(400).json({
            status: "Error",
            message: "No se pudo crear el usuario",
            error: error.message,
        });

    }
};

// se utiliza para autenticar a los usuarios que intentan iniciar sesión
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      //Buscamos por email si existe en la base de datos
      const user = await User.findOne({ email: email });
      //En el caso de que si entramos en el if, si no, devolvemos el mensaje por else 
      if (user) {
        //comparamos contraseñas y si nos devuleve un true, esque no es correcto
        // de lo contrario nos devulve un false y manda el mensaje
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          //TODO: GENERAR TOKEN
  
          const payload= {
            userId: user._id,
            nombre: user.name,
            email: user.email,
            role: user.role,
           
          };
          const token = generateToken(payload, false);
          const token_refresh = generateToken(payload, true);
          
          return res.status(200).json({
            status: "succeeded",
            data: user,
            token: token,
            token_refresh: token_refresh,
          });
        } else {
          return res.status(200).json({
            status: "Error",
            message: "Email y contraseña no coinciden",
          });
        }
      } else {
        res.status(200).json({
          status: "Error",
          message: "Email y contraseña no coinciden",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "Error",
        message: "No se ha podido hacer login",
        error: error.message
      });
    };
};
  
  

module.exports = { addUser, login }


// https://api.themoviedb.org/3//movie/now_playing?language=es-ES&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&page=1