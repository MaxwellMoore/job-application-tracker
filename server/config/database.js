const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("application_tracker", "dev_user", "dev_user", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
