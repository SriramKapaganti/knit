import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { register } from "../services/auth";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Create Account ✨
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Sign up to start managing your tasks
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && (
            <Typography color="error" mt={1} textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2, textTransform: "none", fontWeight: "bold" }}
          >
            Register
          </Button>
        </form>

        <Typography mt={3} textAlign="center">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
