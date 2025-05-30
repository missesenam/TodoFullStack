// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
// routers
const todoRouter = require("./routes/TodoRoutes");
const userRouter = require("./routes/UserRoutes");

// server
const app = express();

// anabling cors with specific origin requirement
// Define specific CORS options
const todoCorsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend.com"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

const userCorsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend.com"],
  methods: ["POST"],
  credentials: true,
};
// generall cors
// app.use(cors(corsOptions));

// body parser,cookie middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Router and cors middlesware
app.use("/api/todos", cors(todoCorsOptions), todoRouter);
app.use("/api/auth", cors(userCorsOptions), userRouter);
// app.use(cors());

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
