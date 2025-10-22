import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// ✅ Get all non-deleted todos
router.get("/", async (req, res) => {
  const todos = await Todo.find({ deleted: false });
  res.json(todos);
});

// ✅ Create new todo
router.post("/", async (req, res) => {
  try {
    const { text, dueDate } = req.body;  // <-- add dueDate here
    const todo = new Todo({ text, dueDate });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Update (mark complete/incomplete)
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.completed === true) {
      updateData.completedAt = new Date();
    } else if (req.body.completed === false) {
      updateData.completedAt = null;
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Soft delete route (mark as deleted)
router.patch("/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
