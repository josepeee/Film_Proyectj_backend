const crypto = require("crypto");
const { create } = require("./models/moviesModels");

const secret = "codespace full stack 14 refresh";

const hash = crypto 
.createHmac("sha256", secret)
.update("soy un campo secreto refresh")
.digest("hex");

console.log(hash);
