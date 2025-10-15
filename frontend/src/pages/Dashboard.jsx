import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

import {
  addTask,
  deleteTask,
  getTasks,
  profile,
  updateTask,
  logout,
} from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await profile();
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (selectedTask) await updateTask(selectedTask.id, taskData);
      else await addTask(taskData);
      setOpenForm(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      maxWidth="md"
      sx={{
        width: "100%", // full width on mobile
        maxWidth: 600, // max width on desktop
        mx: "auto", // centers horizontally
        px: 2, // optional padding
      }}
    >
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        {/* Profile Card */}
        {user && (
          <Card
            sx={{
              mb: 6,
              mx: "auto",
              maxWidth: 600,
              p: 2,
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>
              <Button variant="contained" onClick={() => setOpenForm(true)}>
                Add Task
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Task List */}
        <Grid container spacing={3} justifyContent="center">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {task.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
              No tasks found. Add a task to get started.
            </Typography>
          )}
        </Grid>

        {/* Task Form Modal */}
        <TaskForm
          open={openForm}
          handleClose={() => {
            setOpenForm(false);
            setSelectedTask(null);
          }}
          handleSave={handleSaveTask}
          task={selectedTask}
        />
      </Container>
    </Box>
  );
}
