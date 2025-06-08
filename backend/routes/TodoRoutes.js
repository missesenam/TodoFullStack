const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middlewares/isAuth");
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
  isAuth,
  [body("task").not().isEmpty().withMessage("task field required")],
  createTodo
);
todoRouter.get("/", isAuth, retrieveTodo);
todoRouter.get("/:id", isAuth, retriveTodoById);
todoRouter.put("/:id/complete", isAuth, updateTodo);
todoRouter.put("/:id", isAuth, updateTodo);

todoRouter.delete("/:id", isAuth, deleteTodo);

module.exports = todoRouter;
