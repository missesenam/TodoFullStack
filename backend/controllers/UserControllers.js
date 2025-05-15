const userModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }

    const { name, email, password } = req.body;
    const emailIsUniq = await userModel.findOne({ email });
    if (emailIsUniq) {
      res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "failed to create User" });
  }
};

const retrieveUsers = async (req, res) => {
  try {
    const findUsers = await userModel.find();
    if (findUsers.length === 0) {
      res.status(404).json({ message: "No Users available" });
    }
    res.status(200).json({
      message: "All Users",
      numberOfUsers: findUsers.length,
      Users: findUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve todo" });
  }
};

const signIn = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }
    // data from the body
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // compare password
    const compPassword = await bcrypt.compare(password, findUser.password);
    if (!compPassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // token
    const token = jwt.sign(
      {
        userId: findUser._id,
        email: findUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve User" });
  }
};

module.exports = {
  signUp,
  retrieveUsers,
  signIn,
};
