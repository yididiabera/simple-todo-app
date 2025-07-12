import db from "../config/db.js"

// @desc Get all todos
// @route GET /todos
// @access protected
export const getTodos = (req, res) => {
    try {
        const getTodos = db.prepare(`
        SELECT * FROM todos WHERE user_id = ?`)
        const todos = getTodos.all(req.userId)

        res.json(todos)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" })
    }
}

// @desc Create a new todo
// @route POST /todos
// @access protected
export const createTodo = (req, res) => {
    //console.log("POST to dos", req.body);
    try {
        if (!req.body?.task) {
            return res.status(400).json({ error: "Task is required" })
        }

        const { task } = req.body;

        const inserTodo = db.prepare(`
        INSERT INTO todos (user_id, task) VALUES(?, ?)`)
        const result = inserTodo.run(req.userId, task)

        res.json({
            id: result.lastInsertRowid,
            task: task,
            completed: 0
        })
    } catch (error) {
        console.log("POST / Error", error)

        res.status(500).json({ error: "Failed to create" })
    }

}

// @desct Update a todo
// @route PUT /todos
// @access protected
export const updataTodo = (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
    const { page } = req.query;

    const updatedTodo = db.prepare(`
            UPDATE todos SET completed = ? WHERE id = ?`)
    updatedTodo.run(completed, id);

    res.json({ Message: "Completed" })
}

// @desct Delete a todo 
// @route DELETE /todos/:id
// @access protected
export const deleteTodo = (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const deletedTodo = db.prepare(`
            DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deletedTodo.run(id, userId);

    res.json({ Message: "Todo deleted successfully" })
}