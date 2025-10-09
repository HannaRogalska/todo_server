import express from "express";
import {getTodos} from "../controllers/todosController.js"

const router = express.Router();

router.get("/todos",getTodos)

export default router;