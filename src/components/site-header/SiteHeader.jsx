import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";
import jwt_decode from "jwt-decode";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import DrawerComponent from "./DrawerComponent";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import TitleHomepage from "../title-homepage/TitleHomepage";
import axios from "../../api/axios";

import AuthContext from "../../context/AuthProvider";

//TODO: after seting isAuth, replace image photo, profileLink

function SiteHeader(props) {
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth.username;
  console.log(isAuth);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    axios.get(`/users/${auth.username}`).then((response) => {
      setProfile(response.data);
    });
  }, [auth]);
  const defaultProfileAvatarUrl =
    "https://i.pinimg.com/564x/3a/88/6a/3a886a5b90c687d0904b884b639157cc.jpg";
  const profileAvatarUrl = profile?.profile_pic_url || defaultProfileAvatarUrl;

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
      pageLink: `/${auth.username}`,
    },
    logout: {
      pageName: "Logout",
      pageLink: "/logout",
    },
    deleteAccount: {
      pageName: "Delete Account",
      pageLink: "/delete",
    },
  };
  console.log(pageLinks);
  const { projects, community, contributors, login, signup } = pageLinks;
  const pages = [projects, community, contributors];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [valueNavbar, setValueNavbar] = useState(0);

  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--color1)" }}>
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
                <TitleHomepage variant="h5" marginTop="4" />
              </Typography>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "inline-flex",
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
                <Box sx={{ display: "flex", marginLeft: "auto" }}>
                  <SearchBar />
                  <Tabs
                    value={valueNavbar}
                    onChange={(e, val) => setValueNavbar(val)}
                    textColor="inherit"
                    indicatorColor="secondary"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "var(--color3)",
                      },
                    }}
                  >
                    {pages.map((page, index) => (
                      <Tab
                        key={index}
                        label={page.pageName}
                        to={`${page.pageLink}`}
                        component={Link}
                        sx={{ paddingX: 0.8 }}
                      />
                    ))}
                    {!isAuth && (
                      <Tab
                        key="10"
                        label={login.pageName}
                        to={`${login.pageLink}`}
                        component={Link}
                        sx={{
                          paddingRight: 0,
                        }}
                      />
                    )}
                    {!isAuth && (
                      <Tab
                        key="12"
                        label={signup.pageName}
                        to={`${signup.pageLink}`}
                        component={Link}
                        sx={{ paddingLeft: 0 }}
                      />
                    )}
                  </Tabs>
                </Box>
              </Grid>
            </Grid>

            {isAuth && (
              <Box sx={{ flexGrow: 1, marginLeft: 1 }}>
                <MenuBar
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
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
