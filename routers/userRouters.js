const { addUser, login, refreshToken} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/auth");
const router = require("express").Router();

router.post("/signup", addUser);
router.post("/login", login);
router.get("/refreshToken", verifyToken, refreshToken);
module.exports = router;