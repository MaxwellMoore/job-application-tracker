const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("./../config/config");
const User = require("./../models/user.model");

// METHOD: signIn
const signIn = async (req, res) => {
  // Validate Email and Password are present
  if (!req.body.email) {
    return res.status(400).send({ error: "Enter a valid Email" });
  }
  if (!req.body.password) {
    return res.status(400).send({ error: "Enter a valid Password" });
  }

  try {
    // Query for existing user
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Authenticate Email with Password
    if (!(await user.authenticate(req.body.password))) {
      return res.status(401).send({
        error: "Authentication Failed: Email and Password do not match",
      });
    }

    // Generate access token
    const token = jwt.sign({ id: user.user_id }, config.jwtSecret, {
      expiresIn: "12h",
    });

    // Return access token and user detailss
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

// METHOD: isAuthenticated
const isAuthenticated = expressJwt({
  secret: config.jwtSecret,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

// METHOD: isAuthorized
const isAuthorized = (req, res, next) => {
  const authorized =
    req.profile &&
    req.auth &&
    req.profile.user_id.toString() === req.auth.id.toString();
  if (!authorized) {
    return res.status(403).send({ error: "Not Authorized" });
  }
  next();
};

module.exports = {
  signIn,
  isAuthenticated,
  isAuthorized,
};
