import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BatchPredictionOutlinedIcon from '@mui/icons-material/BatchPredictionOutlined';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import "./SiteHeader.css";
import DrawerComponent from "./DrawerComponent";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import TitleHomepage from "../title-homepage/TitleHomepage";
import axios from "../../api/axios";

import AuthContext from "../../context/AuthProvider";

function SiteHeader() {
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.username;
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (auth?.username) {
      axios.get(`/users/${auth?.username}`).then((response) => {
        setProfile(response.data);
      });
    }
  }, [auth]);
  let profileAvatarUrl;
  const defaultProfileAvatarUrl =
    "https://i.pinimg.com/564x/3a/88/6a/3a886a5b90c687d0904b884b639157cc.jpg";
  if (profile) {
    profileAvatarUrl = profile?.profile_pic_url;
  } else profileAvatarUrl = defaultProfileAvatarUrl;

  const pageLinks = {
    projects: { pageName: "Projects", pageLink: "/projects" },
    community: {
      pageName: "Community",
      pageLink: "/users",
    },
    contributors: {
      pageName: "Contributors",
      pageLink: "/contributors",
    },
    login: {
      pageName: "Login",
      pageLink: "/login",
    },
    signup: {
      pageName: "Signup",
      pageLink: "/register",
    },
    profile: {
      pageName: "Profile",
      pageLink: `/users/${auth?.username}`,
    },
    logout: {
      pageName: "Logout",
      pageLink: "/logout",
    },
    deleteAccount: {
      pageName: "Delete Account",
      pageLink: "/delete",
    },
    addNewProject: {
      pageName: "Add new project",
      pageLink: "/projects/create",
    },
  };
  const { projects, community, contributors, login, signup } = pageLinks;
  const pages = isAuth
    ? [projects, community, contributors]
    : [projects, community, contributors, login, signup];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [tooltipAddProject, setTooltipAddProject] = React.useState(null);
  const handleOpenAddProject = (event) => {
    setTooltipAddProject(event.currentTarget);
  };
  const handleOpenCloseProject = () => {
    setTooltipAddProject(null);
  };

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "var(--color1)" }}
      className="site-header"
    >
      <Toolbar sx={{ backgroundColor: "var(--color1)" }}>
        {isMatch ? (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                marginTop="6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
                }}
              >
                <TitleHomepage marginTop="4" fontSize={"1em"} />
              </Typography>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                <SearchBar />
                <DrawerComponent
                  isAuth={isAuth}
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
                />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
                }}
              >
                <TitleHomepage variant="h5" marginTop="0" />
              </Typography>
              <Grid item sx={{ marginLeft: "auto", color: "var(--color4)" }}>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "auto",
                    alignItems: "center",
                  }}
                >
                  <SearchBar />
                  <List
                    sx={{
                      display: "flex",
                      marginLeft: "auto",
                    }}
                  >
                    {pages.map((page, index) => (
                      <ListItemButton
                        key={index}
                        to={`${page.pageLink}`}
                        component={Link}
                        sx={{
                          borderBottom: "0",
                          "&:hover": {
                            backgroundColor: "var(--color2)",
                          },
                        }}
                        divider
                      >
                        <ListItemIcon>
                          <ListItemText
                            sx={{
                              color: "var(--color4)",
                              "&:hover": {
                                color: "var(--color3)",
                              },
                            }}
                          >
                            {page.pageName}
                          </ListItemText>
                        </ListItemIcon>
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Grid>
            </Grid>

            {isAuth && (
              <Box sx={{ flexGrow: 1, marginLeft: 1, display: "flex" }}>
                <Tooltip title="Add new project">
                  <IconButton onClick={handleOpenAddProject} sx={{ p: 0 }}>
                  <Link to={`/projects/create`}>
                    <BatchPredictionOutlinedIcon
                      sx={{ marginY: 1, color: "var(--color4)" }}
                      fontSize={"large"}
                      className="icon socmed"
                    />
                  </Link>
                  </IconButton>
                </Tooltip>
                
                <MenuBar
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
                  marginTop={1}
                />
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
