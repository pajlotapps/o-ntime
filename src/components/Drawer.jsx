import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { Link } from "react-router-dom";

const DrawerComponent = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#000000", width: "50%" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {Object.keys(links).map((link, index) => (
            <ListItemButton onClick={() => setOpen(false)} key={index} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  <Link to={links[link].href} className="text-link">
                    {links[link].label}
                  </Link>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpen(!open)}
      >
        <DragHandleRoundedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
