const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied");
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};

const verifyRole = (req, res, next) => {
  try {
    const payload = req.payload;
    if (!payload.role || payload.role === "user")
      return res.status(400).send("Acceso denegado");
    req.payload = payload;
    next();
  } catch (error) {
    res.status(400).send("Expired token");
  }
};

const isAdim = (rep, res, next) => {
  try {
    const payload = req.payload;
    if (!payload.role || payload.role === "adim")
      return res.status(400).send("Acceso denegado,no eres adinistrador");
    req.payload = payload;
    next();
  } catch (error) {
    res.status(400).send("Expired token");
  }
};



module.exports = { verifyToken, verifyRole, isAdim};