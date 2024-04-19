const express = require("express");
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");

const router = express.Router();

router.route("/auth/register").post(userController.create);
//router.route("/auth/signin").post(authController.signin);

module.exports = router;
