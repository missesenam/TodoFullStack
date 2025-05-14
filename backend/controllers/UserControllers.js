const userModel = require("../models/UserModel");

const createUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to create User" });
  }
};

const retrieveUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve User" });
  }
};

const retriveUserById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to retrive by id User" });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to update User" });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to delete User" });
  }
};

module.exports = {
  createUser,
  retrieveUser,
  retriveUserById,
  updateUser,
  deleteUser,
};
