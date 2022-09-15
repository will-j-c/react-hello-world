import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);
  const links = ["Login", "Signup", "Products", "Community", "Contributors"];
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { backgroundColor: "var(--color1)" },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map((link, index) => (
            <ListItemButton key={index} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "var(--color4)" }}
        onClick={() => setOpen(true)}
      >
        <MenuOutlinedIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
