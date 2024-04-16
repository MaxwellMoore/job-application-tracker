const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./model.user");

const Application = sequelize.define("Application", {
  application_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  job_title: {
    type: DataTypes.STRING,
  },
  company_name: {
    type: DataTypes.STRING,
  },
  application_status: {
    type: DataTypes.STRING,
  },
});

module.exports = Application;
