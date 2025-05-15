const express = require("express");
const { body } = require("express-validator");
const {
  createTodo,
  retrieveTodo,
  retriveTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoControllers");

const todoRouter = express.Router();

todoRouter.post(
  "/",
  [body("task").not().isEmpty().withMessage("task field required")],
  createTodo
);
todoRouter.get("/", retrieveTodo);
todoRouter.get("/:id", retriveTodoById);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

module.exports = todoRouter;
