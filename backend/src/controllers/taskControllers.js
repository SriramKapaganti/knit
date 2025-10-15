import {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../models/taskModels.js";
import db from "../config/db.js";

createTask;

// Create a task
export const addTask = (req, res) => {
  const { title, description } = req.body;
  const task = createTask(req.user.id, title.trim(), description.trim());
  return res.status(201).json({ task });
};

// Get all tasks of logged-in user
export const getTasks = (req, res) => {
  const tasks = getTasksByUser(req.user.id);
  return res.status(200).json({ tasks });
};

// Update a task
export const editTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  updateTask(id, title.trim(), description.trim(), status);
  return res.status(200).json({ message: "Task updated successfully" });
};

// Delete a task
export const removeTask = (req, res) => {
  const { id } = req.params;
  deleteTask(id);
  return res.status(200).json({ message: "Task deleted successfully" });
};
