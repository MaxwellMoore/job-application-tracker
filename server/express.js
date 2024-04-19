// Required packages
const express = require("express");
const path = require("path");

// Required routes
const authRouter = require("./routes/auth.routes");

const app = express();

// Configure middleware
app.use(express.json());

// Mount routes
app.use("/", authRouter);

module.exports = app;
