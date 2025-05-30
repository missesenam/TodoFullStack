const express = require("express");
const {
  signUp,
  retrieveUsers,
  signIn,
  signOut,
} = require("../controllers/UserControllers");
const { body } = require("express-validator");
const userModel = require("../models/UserModel");

const userRouter = express.Router();

const checkUniqueness = async (value, { req, path }) => {
  try {
    const isMatch = await userModel.findOne({ [path]: value });
    if (isMatch) {
      return Promise.reject(`${path} already exists`);
      // throw new Error(`${path} already exists`);
    }
  } catch (err) {
    return Promise.reject("Error checking uniqueness");
  }
};

userRouter.post(
  "/signup",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("name exists already")
      .custom(checkUniqueness),
    body("email")
      .isEmail()
      .not()
      .isEmpty()
      .withMessage("email exists already")
      .custom(checkUniqueness),
  ],
  signUp
);
userRouter.get("/getusers", retrieveUsers);
userRouter.post("/signin", signIn);
userRouter.post("/signout", signOut);

module.exports = userRouter;
