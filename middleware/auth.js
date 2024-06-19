const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);

const jwt_secret = "secret_shit";

async function authenTicateUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verifyJWT(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}

async function generateJWT(user) {
  console.log(user, 'shit')
  const payload = {
    username: user.username,
    id: user._id,
  };
  const token = await signJWT(payload, jwt_secret, { expiresIn: "1h" });
  return token;
}

module.exports = { authenTicateUser, generateJWT };
