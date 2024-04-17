const express = require("express");
const sequelize = require("./config/database");
const config = require("./config/config");

const app = express();

// Sync the Sequelize models with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
