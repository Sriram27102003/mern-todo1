import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },      // ⏳ required field
  completedAt: { type: Date, required: false }, // 🕓 when finished
});

export default mongoose.model("Todo", todoSchema);
