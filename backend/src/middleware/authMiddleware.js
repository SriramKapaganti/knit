import { findUserById } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const Protect = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies.token || req.headers.Authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user From DB

    const user = findUserById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    // Attach user to req for controllers
    req.user = { id: user.id, name: user.name, email: user.email };

    next(); // allows access to next middleware/controller
  } catch {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
