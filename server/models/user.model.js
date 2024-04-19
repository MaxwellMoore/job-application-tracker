const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    access_token_expiry: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        try {
          if (!user.password) {
            throw new Error("Password cannot be blank");
          }
          user.password = await bcrypt.hash(user.password, 10);
        } catch (error) {
          throw new Error("Error hashing password: " + error.message);
        }
      },
      beforeUpdate: async (user) => {
        try {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        } catch (error) {
          throw new Error("Error hashing password: " + error.message);
        }
      },
    },
  }
);

// METHOD: Authenticate user
User.prototype.authenticate = async function (plainText) {
  if (!plainText) {
    return "";
  }
  try {
    let isMatch = await bcrypt.compare(plainText, this.password);
    return isMatch;
  } catch (error) {
    console.error(error);
  }
};

// METHOD: Check if access_token is expired
User.prototype.checkAccessTokenExpiry = function () {
  const currentDate = new Date();
  const expiryDate = this.access_token_expiry;
  return expiryDate && expiryDate < currentDate;
};

// METHOD: Fetch new access_token using refresh_token
User.prototype.requestAccessToken = function () {
  // TODO: Implement logic to request new OAuth2 access_token from Google using OAuth2 refresh_token
};

module.exports = User;
