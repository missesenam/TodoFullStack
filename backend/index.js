// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// server
const app = express();

// anabling cors with specific origin requirement
// const corsOptions = {
//   origin: ["http://localhost:3000", "https://your-frontend.com"],
//   methods: ["GET", "POST"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// routers
const todoRouter = require("./routes/TodoRoutes");
const userRouter = require("./routes/UserRoutes");

// body parser middleware
app.use(bodyParser.json());

// Router and cors middlesware
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);
app.use(cors());

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
