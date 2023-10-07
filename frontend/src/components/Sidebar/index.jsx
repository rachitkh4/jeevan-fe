import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Dvr } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose, list }) => {
  const navigate = useNavigate();

  const redirectRoutes = (route) => {
    navigate(route);
  };
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#fff",
          padding: "120px 0 30px 0",
        },
      }}
    >
      <List sx={{ textAlign: "left" }}>
        <ListItem>
          <ListItemIcon onClick={() => redirectRoutes("/dashboard")}>
            <HomeIcon
              sx={{
                fontSize: 30,
                width: 30,
                height: 30,
                color: "black",
                cursor: "pointer",
              }}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemIcon onClick={() => redirectRoutes("/patient-list")}>
            <PersonIcon
              sx={{
                fontSize: 30,
                width: 30,
                height: 30,
                color: "black",
                cursor: "pointer",
              }}
            />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemIcon onClick={() => redirectRoutes("/appointment-list")}>
            <Dvr
              sx={{
                fontSize: 30,
                width: 30,
                height: 30,
                color: "black",
                cursor: "pointer",
              }}
            />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
