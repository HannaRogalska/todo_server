import express from "express";
import { getTodos, postTodo } from "../controllers/todosController.js";

const router = express.Router();

router.get("/todos", getTodos)
router.post("/todos", postTodo);

export default router;