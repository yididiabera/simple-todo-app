import express from "express"
import db from "../config/db.js"
import { getTodos, createTodo, updataTodo, deleteTodo } from "../controllers/todosController.js"
const router = express.Router()

// Get all todos
router.get('/', getTodos)


router.post('/', createTodo)


router.put('/:id', updataTodo)


router.delete('/:id', deleteTodo)

export default router;