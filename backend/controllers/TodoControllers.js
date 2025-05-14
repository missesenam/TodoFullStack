const todoModel = require("../models/TodoModel");

const createTodo = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to create todo" });
  }
};

const retrieveTodo = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve todo" });
  }
};

const retriveTodoById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to retrive by id todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "failed to delete todo" });
  }
};

module.exports = {
  createTodo,
  retrieveTodo,
  retriveTodoById,
  updateTodo,
  deleteTodo,
};
