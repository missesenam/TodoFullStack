const express = require("express");
const {
  createUser,
  retrieveUser,
  retriveUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserControllers");

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", retrieveUser);
userRouter.get("/:id", retriveUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
