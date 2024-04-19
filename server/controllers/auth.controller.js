/*
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const config = require("./../config/config");
const User = require("./../models/user.model");

const signIn = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({ error: "Enter a valid Email" });
  }
  if (!req.body.password) {
    return res.status(400).send({ error: "Enter a valid Password" });
  }
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (!(await user.authenticate(req.body.password))) {
      return res.status(401).send({
        error: "Authentication Failed: Email and Password do not match",
      });
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "12h",
    });
    return res.status(200).send({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const isAuthenticated = expressJWT({
  secret: config.jwtSecret,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

const isAuthorized = (req, res, next) => {};
*/
