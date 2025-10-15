import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskList({
  tasks,
  handleEdit,
  handleDelete,
  handleStatusChange,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            minWidth: 300,
            minHeight: 120,
            flexWrap: "wrap",
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {task.description}
            </Typography>
            <Chip
              label={task.status}
              color={task.status === "done" ? "success" : "warning"}
              size="small"
            />
          </CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            {/* Status Selector */}
            <FormControl size="small">
              <Select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>

            {/* Edit & Delete Buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="primary" onClick={() => handleEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
