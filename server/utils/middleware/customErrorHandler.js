const customErrorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.error(err.stack);
    res.status(401).json({ error: "Not authenticated" });
  }
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

module.exports = customErrorHandler;
