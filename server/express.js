// Required packages
const express = require("express");
const cors = require("cors");
const path = require("path");
const customErrorHandler = require("./utils/middleware/customErrorHandler");

// Required routes
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const appItemRouter = require("./routes/appItem.routes");

const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", appItemRouter);

// Mount error handler
app.use(customErrorHandler);

module.exports = app;
