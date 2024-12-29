
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true, // Due date is required
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  assignedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    required: true,
    default: [],
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Task model using the schema
export const TaskModel = mongoose.model("Task", taskSchema);
