const todoModel = require("../models/TodoModel");
const { validationResult } = require("express-validator");

const createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }
    // data from req body
    const { task, description, completed } = req.body;
    const newTask = await todoModel.create({
      task,
      description,
      completed,
      user: req.user.userId,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
    console.log("User info from token:", req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create todo", error: error.message });
  }
};

const retrieveTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const findTasks = await todoModel.find({ user: userId });
    if (findTasks.length === 0) {
      return res.status(404).json({ message: "No Tasks available", tasks: [] });
    }
    res.status(200).json({
      message: "All tasks",
      numberOfTasks: findTasks.length,
      tasks: findTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve todo" });
  }
};

const retriveTodoById = async (req, res) => {
  const id = req.params.id;
  const theTask = await todoModel.findById(id);
  if (!theTask) {
    res.status(404).json({ message: "Task not found", id });
  }
  res.status(200).json({ message: "Task found", theTask });

  try {
  } catch (error) {
    res.status(500).json({ message: "failed to retrive by id todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { task, description, completed } = req.body;
    const id = req.params.id;
    // Ensure the task belongs to the logged-in user
    const existingTask = await todoModel.findOne({
      _id: id,
      user: req.user.userId,
    });
    if (!existingTask) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    const updatedTask = await todoModel.findByIdAndUpdate(
      id,
      {
        task,
        description,
        completed,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const existingTask = await todoModel.findOne({
      _id: id,
      user: req.user.userId,
    });
    if (!existingTask) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }
    const deletedTask = await todoModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ message: "failed to delete a Task" });
  }
};

module.exports = {
  createTodo,
  retrieveTodo,
  retriveTodoById,
  updateTodo,
  deleteTodo,
};
