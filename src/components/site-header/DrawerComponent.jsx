import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TitleHomepage from "../title-homepage/TitleHomepage";
import Avatar from "@mui/material/Avatar";
import AvatarComponent from "../avatar/Avatar";

function DrawerComponent(props) {
  const {
    projects,
    community,
    contributors,
    login,
    signup,
    profile,
    logout,
    deleteAccount,
  } = props.pageLinks;
  const pages = props.isAuth
    ? [projects, community, contributors, logout, deleteAccount]
    : [login, signup, projects, community, contributors];

  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { backgroundColor: "var(--color1)" },
        }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {props.isAuth ? (
            <>
              <ListItemButton
                key={0}
                to={`${profile.pageLink}`}
                component={Link}
                divider
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="profileOwner" src={props.profileAvatarUrl} />
                </IconButton>
              </ListItemButton>
            </>
          ) : (
            <>
              <TitleHomepage variant="h6" marginTop="0" />
            </>
          )}

          {pages.map((page, index) => (
            <ListItemButton
              key={index}
              to={`${page.pageLink}`}
              component={Link}
              divider
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  {page.pageName}
                </ListItemText>
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
}

export default DrawerComponent;
