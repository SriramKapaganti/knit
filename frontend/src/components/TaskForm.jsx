import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function TaskForm({ open, handleClose, handleSave, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); // default status

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status || "pending");
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [task]);

  const onSave = () => {
    if (!title.trim() || !description.trim()) return;
    handleSave({
      title: title.trim(),
      description: description.trim(),
      status, // include status
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          {task ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
