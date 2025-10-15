import connectDB from "../config/db.js";

const db = connectDB();

// CREATE NEW USER INFO

export const createUser = async (name, email, password) => {
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
  );
  const info = stmt.run(name, email, password);
  return { id: info.lastInsertRowid, name, email };
};

// FIND USER BY EMAIL ID

export const findUserByEmail = (email) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ? ");
  return stmt.get(email);
};

// FIND USER BY USER ID

export const findUserById = (id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ? ");
  return stmt.get(id);
};
