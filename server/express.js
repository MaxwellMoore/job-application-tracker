// Required packages
const express = require("express");
const path = require("path");
const customErrorHandler = require("./utils/middleware/customErrorHandler");

// Required routes
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();

// Configure middleware
app.use(express.json());

// Mount routes
app.use("/", authRouter);
app.use("/", userRouter);

// Mount error handler
app.use(customErrorHandler);

module.exports = app;
