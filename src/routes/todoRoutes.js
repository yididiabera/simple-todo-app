import express from "express"
import db from "../config/db.js"
import { getTodos, createTodo, updataTodo, deleteTodo } from "../controllers/todosController.js"
const router = express.Router()

// Get all todos
router.get('/', getTodos)

// Create a todo
router.post('/', createTodo)

// Update a todo
router.put('/:id', updataTodo)

// Delete a todo
router.delete('/:id', deleteTodo)

export default router;