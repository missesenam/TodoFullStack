// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 3000;

// routers
const todoRouter = require("./routes/TodoRoutes");
const userRouter = require("./routes/UserRoutes");

// server
const app = express();

// body parser middleware
app.use(bodyParser.json());

// Router
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((resu) => {
    app.listen(port, () =>
      console.log(`the server up and ready on port: ${port}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
