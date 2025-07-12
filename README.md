---

# 📝 Simple To-Do Backend API

This is a simple **Node.js + Express** backend API for a To-Do app with **user authentication** and **SQLite database** using `better-sqlite3`.

---

## 📁 Features

* User registration and login with JWT authentication
* Secure password hashing with bcrypt
* Create, Read, Update, Delete (CRUD) for To-Dos
* SQLite database with `better-sqlite3`
* Middleware-based authentication
* Public static file support

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v18+ recommended)
* NPM

---

### 📦 Installation

```bash
git clone https://github.com/your-username/todo-backend.git
cd todo-backend
npm install
```

---

### ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

---

### ▶️ Running the App

```bash
node server.js
```

The server will run at:

```
http://localhost:5000
```

---

## 📚 API Endpoints

### 🔐 Auth Routes (`/auth`)

* `POST /auth/register`
  Register a new user
  **Body:** `{ "username": "test", "password": "123456" }`

* `POST /auth/login`
  Login user and receive JWT
  **Body:** `{ "username": "test", "password": "123456" }`

---

### ✅ To-Do Routes (`/todos`)

> All `/todos` routes require a JWT token in the `Authorization` header:
> `Authorization: Bearer <token>`

* `GET /todos` – Get all todos for the logged-in user
* `POST /todos` – Create a new todo
  **Body:** `{ "task": "Learn Node.js" }`
* `PUT /todos/:id` – Update a todo’s completion status
  **Body:** `{ "completed": true }`
* `DELETE /todos/:id` – Delete a todo

---

## 🗃️ Database

* SQLite file: `todos.db`
* Automatically initialized with `users` and `todos` tables

---

## 💡 Notes

* Uses `better-sqlite3` for fast, synchronous SQLite access
* Passwords are hashed using `bcryptjs`
* JWT is used for user session management

---

## 🛠️ To Do

* Add pagination or filters
* Add task deadlines or categories
* Add user profile routes

---

## 📄 License

MIT License

---
