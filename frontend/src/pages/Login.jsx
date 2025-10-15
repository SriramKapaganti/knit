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
import { login } from "../services/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          Welcome Back 👋
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Sign in to continue to your dashboard
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
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
            Login
          </Button>
        </form>

        <Typography mt={3} textAlign="center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
