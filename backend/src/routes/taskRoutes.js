import express from "express";

import { Protect } from "../middleware/authMiddleware.js";
import {
  addTask,
  getTasks,
  editTask,
  removeTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

// Protect all routes
router.use(Protect);

router.get("/", getTasks); // GET /api/tasks/
router.post("/", addTask); // POST /api/tasks/
router.put("/:id", editTask); // PUT /api/tasks/:id
router.delete("/:id", removeTask); // DELETE /api/tasks/:id

export default router;
