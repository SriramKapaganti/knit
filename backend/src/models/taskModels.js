import connectDB from "../config/db.js";
const db = connectDB();

// Create Task
export const createTask = (userId, title, description) => {
  const stmt = db.prepare(
    "INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)"
  );
  const info = stmt.run(userId, title, description);
  return { id: info.lastInsertRowid, title, description, status: "pending" };
};

// Get tasks by userId
export const getTasksByUser = (userId) => {
  const stmt = db.prepare("SELECT * FROM tasks WHERE userId = ?");
  return stmt.all(userId);
};

// Update Task
export const updateTask = (id, title, description, status) => {
  const updates = [];
  const params = [];

  if (title !== undefined && title.trim() !== "") {
    updates.push("title = ?");
    params.push(title.trim());
  }
  if (description !== undefined && description.trim() !== "") {
    updates.push("description = ?");
    params.push(description.trim());
  }
  if (status !== undefined && status.trim() !== "") {
    updates.push("status = ?");
    params.push(status.trim());
  }

  if (updates.length === 0) return; // Nothing to update

  const sql = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`;
  params.push(id);

  const stmt = db.prepare(sql);
  stmt.run(...params);
};

// Delete Task
export const deleteTask = (id) => {
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
  stmt.run(id);
};
