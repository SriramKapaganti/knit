import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes); // /api/auth/register, /api/auth/login
app.use("/api/tasks", taskRoutes); // /api/tasks/ → GET, POST; /api/tasks/:id → PUT, DELETE

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
