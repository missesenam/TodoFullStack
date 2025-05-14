const express = require("express");
const {
  createTodo,
  retrieveTodo,
  retriveTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoControllers");

const todoRouter = express.Router();

todoRouter.post("/", createTodo);
todoRouter.get("/", retrieveTodo);
todoRouter.get("/:id", retriveTodoById);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

module.exports = todoRouter;
