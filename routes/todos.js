import express from "express";
import {
  getTodos,
  postTodo,
  getOneTodo,
} from "../controllers/todosController.js";

const router = express.Router();

router.get("/todos", getTodos)
router.get("/todos/:id", getOneTodo);
router.post("/todos", postTodo);

export default router;