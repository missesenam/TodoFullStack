const userModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SignUp
const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }

    const { name, email, password } = req.body;
    const emailIsUniq = await userModel.findOne({ email });
    if (emailIsUniq) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // Optional: Generate token + set cookie
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
        token,
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "failed to create user" });
  }
};

// Optional: i just did it
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

// SignIn
const signIn = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }
    // Data from the request body
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare password
    const compPassword = await bcrypt.compare(password, findUser.password);
    if (!compPassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Generate token
    const token = jwt.sign(
      {
        userId: findUser._id,
        email: findUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    // Set cookie and return response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1day
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: {
          name: findUser.name,
          email: findUser.email,
        },
        token, // Optional
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "failed to signin" });
  }
};

// log out
const signOut = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(201)
      .json({ message: "log out successful" });
  } catch (error) {
    console.error("LogOut error:", error);
    res.status(500).json({ message: "failed to log out" });
  }
};

module.exports = {
  signUp,
  retrieveUsers,
  signIn,
  signOut,
};
