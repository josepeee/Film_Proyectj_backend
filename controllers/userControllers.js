
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    try {
        const { name, email, password, age, rol } = req.body;
        const user = new User({
            name: name,
            email: email,
            password: await bcrypt.has(password, 10),
            age: age,
            role: role,
            favorites: favorites,
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
  
          const payload = {
            userId: user._id,
            nombre: user.name,
            email: user.email,
            role: user.role,
          };
          // const token = generarteToken(payload, false);
          // const token_refresh = generarteToken(payload, true);
          process.env.token_secret,
            { expiresIn: "1min" }
  
  
          // / token de regresco  es igual que el de arriba pero cambia el tiempo de expireIn......
          const token_refresh = jwt.sign({
            userId: user._id,
            nombre: user.name,
            email: user.email,
  
          },
            process.env.token_refresh,
            { expiresIn: "5min" })
  
          return res.status(200).json({
            status: "succeeded",
            data: user,
            token: token,
            token_refresh
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