import express from "express"
import authMiddleware from "./middlewares/authMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js"

const app = express()
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

//Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))