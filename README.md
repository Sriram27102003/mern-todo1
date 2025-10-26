# 📝 MERN To-Do List App

A simple and responsive **To-Do List web application** built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**.  
It allows users to **create, read, update, and delete (CRUD)** their daily tasks efficiently — with a clean and modern UI.

🔗 **Live Demo:** [https://mern-todo27.onrender.com/](https://mern-todo27.onrender.com/)

---

## 🚀 Features

- ✅ Add new tasks  
- 📋 View all tasks  
- ✏️ Edit existing tasks  
- ❌ Delete tasks  
- 🌐 Connected to a live backend (Render)  
- ⚡ RESTful API integration  
- 🔒 Environment variables secured via `.env`

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React.js, Axios, HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Hosting | Render |

---

## ⚙️ CRUD Operations Explained

| Operation | HTTP Method | Endpoint | Description |
|------------|--------------|-----------|--------------|
| **Create** | `POST` | `/api/todos` | Add a new task to the database |
| **Read** | `GET` | `/api/todos` | Retrieve all tasks |
| **Update** | `PUT` | `/api/todos/:id` | Edit a specific task using its ID |
| **Delete** | `DELETE` | `/api/todos/:id` | Remove a task from the database |

---

## 🧩 Example API Requests

### ➕ Create Task
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn MERN Stack",
  "completed": false
}
```

### 📋 Get All Tasks
```bash
GET /api/todos
```

### ✏️ Update Task
```bash
PUT /api/todos/6738f23b2b1a0a001c2e4b09
Content-Type: application/json

{
  "title": "Learn React CRUD Operations",
  "completed": true
}
```

### ❌ Delete Task
```bash
DELETE /api/todos/6738f23b2b1a0a001c2e4b09
```

---

## 🏗️ Folder Structure

```
MERN-Todo/
│
├── backend/
│   ├── server.js
│   ├── routes/todoRoutes.js
│   ├── models/todoModel.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   └── api/
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## ⚡ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/mern-todo.git
   cd mern-todo
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Create a `.env` file**
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run backend server**
   ```bash
   npm start
   ```
   The server runs at `http://localhost:5000`.

5. **Install and run frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```
   The frontend runs at `http://localhost:3000`.

---

## 📦 Deployment

- **Backend:** Hosted on Render → `https://mern-todo-2j02.onrender.com`
- **Frontend:** Hosted on `https://mern-todo27.onrender.com` and connected to the Render API

---

## 🧰 Dependencies

- **Backend:** express, mongoose, dotenv, cors, nodemon  
- **Frontend:** react, axios  

---

## 📜 License

This project is open-source and free to use under the **MIT License**.
