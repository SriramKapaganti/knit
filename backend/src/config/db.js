import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// handle _dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database file path
const dbPath = path.join(__dirname, "../../database/app.db");

//connect or create db
const db = new Database(dbPath);

// IMPORTANT: enable foreign key enforcement for this connection
db.pragma("foreign_keys = ON");

// create database tables for users and tasks if they not exists

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
    `);

db.exec(`
    
    CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
    `);

console.log("SQLite Database connected successfully!");

export default function connectDB() {
  return db;
}
