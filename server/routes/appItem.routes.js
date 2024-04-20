const express = require("express");
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");
const appItemController = require("./../controllers/appItem.controller");

const router = express.Router();

router.param("userId", userController.userById);
router.param("appId", appItemController.appById);

router
  .route("/api/:userId/app/:appId")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    appItemController.read
  )
  .put(
    authController.isAuthenticated,
    authController.isAuthorized,
    appItemController.update
  )
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized,
    appItemController.remove
  );

router
  .route("/api/apps/:userId")
  .post(
    authController.isAuthenticated,
    authController.isAuthorized,
    appItemController.create
  )
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    appItemController.list
  );

module.exports = router;
