import React, { useState, useEffect } from "react";
import api from "./api";




export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  // ➕ Add todo (requires both text & date)
  const addTodo = async () => {
    if (!text.trim() || !dueDate) {
      alert("Please enter both task and due date!");
      return;
    }
    const res = await api.post("/todos", { text, dueDate });
    setTodos([...todos, res.data]);
    setText("");
    setDueDate("");
  };

  // ✅ Toggle complete
  const toggleComplete = async (id, completed) => {
    const res = await api.put(`/todos/${id}`, { completed: !completed });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  // ❌ Soft delete
  const deleteTodo = async (id) => {
    await api.patch(`/todos/delete/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  // ✏️ Start editing
  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // 💾 Save edited text
  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    const res = await api.put(`/todos/${id}`, { text: editText });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    setEditId(null);
    setEditText("");
  };

  // 🕓 Remaining time logic
  const getRemainingTime = (dueDate) => {
    if (!dueDate) return "";
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    if (diffMs <= 0) return "⚠️ Overdue!";
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const hrs = hours % 24;
    return `${days}d ${hrs}h remaining`;
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundImage: "url('/bg.jpg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "40px",
        backdropFilter: "blur(2px)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#f6f7f9ff" }}>📝 My To-Do Dashboard</h1>

      {/* Input */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #9ca3af",
            width: "60%",
          }}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #9ca3af",
            width: "25%",
            marginLeft: "10px",
          }}
        />

        <button
          onClick={addTodo}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Lists */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          gap: "20px",
        }}
      >
        {/* Active Tasks */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2563eb", borderBottom: "2px solid #93c5fd" }}>
            Active Tasks
          </h2>
          {activeTodos.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No active tasks 🎉</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {activeTodos.map((todo) => (
                <li
                  key={todo._id}
                  style={{
                    backgroundColor: "#dbeafe",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <input
                      type="radio"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id, todo.completed)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    <div>
                      {editId === todo._id ? (
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit(todo._id)}
                          style={{
                            flex: 1,
                            padding: "5px",
                            borderRadius: "6px",
                            border: "1px solid #9ca3af",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#1e3a8a" }}>{todo.text}</span>
                      )}

                      {/* ⏳ Show due date & remaining time */}
                      {todo.dueDate && (
                        <div
                          style={{
                            fontSize: "12px",
                            color:
                              getRemainingTime(todo.dueDate) === "⚠️ Overdue!"
                                ? "red"
                                : "#1E3A8A",
                          }}
                        >
                          Due: {new Date(todo.dueDate).toLocaleString()} |{" "}
                          {getRemainingTime(todo.dueDate)}
                        </div>
                      )}
                    </div>
                  </label>

                  <div>
                    {editId === todo._id ? (
                      <button
                        onClick={() => saveEdit(todo._id)}
                        style={{
                          backgroundColor: "#22c55e",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(todo._id, todo.text)}
                        style={{
                          backgroundColor: "#999797ff",
                          color: "black",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          marginRight: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Tasks */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f0fdf4",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#15803d", borderBottom: "2px solid #86efac" }}>
            Completed
          </h2>
          {completedTodos.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>No completed tasks yet 📋</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {completedTodos.map((todo) => (
                <li
                  key={todo._id}
                  style={{
                    backgroundColor: "#dcfce7",
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <input
                      type="radio"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id, todo.completed)}
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    <div>
                      <span style={{ color: "#14532d" }}>{todo.text}</span>
                      {/* 🕓 Show completed date/time */}
                      {todo.completedAt && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#1E293B",
                          }}
                        >
                          ✅ Completed on:{" "}
                          {new Date(todo.completedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </label>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
