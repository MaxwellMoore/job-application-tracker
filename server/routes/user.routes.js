const express = require("express");
const userController = require("./../controllers/user.controller");
const authController = require("./../controllers/auth.controller");

const router = express.Router();

router.param("userId", userController.userById);

router
  .route("/api/user")
  .get(authController.isAuthenticated, userController.getCurrentUser);
router
  .route("/api/users/:userId")
  .get(authController.isAuthenticated, userController.read)
  .put(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.update
  )
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.remove
  );

module.exports = router;
