import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

//----------Generate token-----------

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};
