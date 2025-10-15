import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 250 },
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        p: 2,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </Box>
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
