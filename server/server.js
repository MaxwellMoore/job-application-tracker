const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/model.user");

const app = express();

// Sync the Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
