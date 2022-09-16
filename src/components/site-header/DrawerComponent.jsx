import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const DrawerComponent = () => {
  const token = true;
  const pages = token
    ? ["Login", "Signup", "Products", "Community", "Contributors"]
    : ["Products", "Community", "Contributors"];
  const [open, setOpen] = useState(false);
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
          <ListItemButton key={0} divider>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </ListItemButton>

          {pages.map((page, index) => (
            <ListItemButton
              key={index}
              to={`/${page}`}
              component={Link}
              divider
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>{page}</ListItemText>
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
