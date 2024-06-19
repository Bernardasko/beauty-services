const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const beautyRouter = require("./routes/beautyRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/beauties", beautyRouter);
  app.use("/api/v1/categories", categoryRouter);

  module.exports = app;

