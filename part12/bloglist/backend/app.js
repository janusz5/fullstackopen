const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

if (config.MONGODB_URI && !mongoose.connection.readyState) mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(express.static("server/build"));

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.get("/health", (req, res) => {
  res.send("ok");
});

app.get("/version", (req, res) => {
  res.send("2"); // change this string to ensure a new version deployed
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.unknownError);

module.exports = app;
