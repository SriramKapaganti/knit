import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

// Register New User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = hashPassword(password);
    const newUser = await createUser(name, email, hashedPassword);

    return res.status(200).json({ user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, token },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user info
export const getProfile = async (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
};

// Logout User
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Server error during logout" });
  }
};
