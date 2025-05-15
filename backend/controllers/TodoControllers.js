const todoModel = require("../models/TodoModel");
const { validationResult } = require("express-validator");

const createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: "validation failed", error: errors.array() });
    }
    // data from req body
    const { task, description, completed } = req.body;
    const newTask = await todoModel.create({
      task,
      description,
      completed,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create todo", error: error.message });
  }
};

const retrieveTodo = async (req, res) => {
  try {
    const findTasks = await todoModel.find();
    if (findTasks.length === 0) {
      res.status(404).json({ message: "No Tasks available" });
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
