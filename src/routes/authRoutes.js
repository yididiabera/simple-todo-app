import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import db from "../config/db.js";

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 10)

    //save a new user and hashedpassword to the database
    try {
        const insertUser = db.prepare(`
                INSERT INTO users (username, password) VALUES(?, ?)`)
        const result = insertUser.run(username, hashedPassword);

        // add first to do
        const defaultTodo = "Hello, Add your first To-Do!";
        const inserTodo = db.prepare(`
                INSERT INTO todos (user_id, task) VALUES(?, ?)`)
        inserTodo.run(result.lastInsertRowid, defaultTodo);

        // create a token
        const token = jwt.sign(
            { id: result.lastInsertRowid },
            process.env.JWT_SECRET,
            { expiresIn: "7days" })

        res.json({ token })

    } catch (error) {
        console.log("Error", error)
        res.sendStatus(503)
    }

})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        const getUser = db.prepare(`
            SELECT * FROM users WHERE username = ?`)
        const user = getUser.get(username);
        if (!user) { return res.status(404).send({ Message: "User not found!" }) }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) { return res.status(401).send({ message: "Invalid Password!" }) }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7days" })
        res.json({ token })
    } catch (error) {
        console.log("Erro:", error)
        res.sendStatus(503)
    }

});

export default router;