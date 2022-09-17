import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";

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

function SiteHeader() {
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth.username;
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
  }

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
      pageLink: `/${auth?.username}`,
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
  const { projects, community, contributors, login, signup } = pageLinks;
  const pages = isAuth
    ? [projects, community, contributors]
    : [projects, community, contributors, login, signup];
  const pagesAuth = [projects, community, contributors];
  const pagesUnAuth = [projects, community, contributors, login, signup];
  // const pages = [projects, community, contributors];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(0);

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
                  {isAuth ? (
                    <Tabs
                      value={value}
                      onChange={(e, val) => {
                        setValue(val);
                      }}
                      textColor="inherit"
                      indicatorColor="secondary"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "var(--color3)",
                        },
                      }}
                    >
                      {pagesAuth.map((page, index) => (
                        <Tab
                          key={index}
                          label={page.pageName}
                          to={page.pageLink}
                          component={Link}
                          sx={{ paddingX: 0.8 }}
                        />
                      ))}
                    </Tabs>
                  ) : (
                    <Tabs
                      value={value}
                      onChange={(e, val) => {
                        setValue(val);
                      }}
                      textColor="inherit"
                      indicatorColor="secondary"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "var(--color3)",
                        },
                      }}
                    >
                      {pagesUnAuth.map((page, index) => (
                        <Tab
                          key={index}
                          label={page.pageName}
                          to={page.pageLink}
                          component={Link}
                          sx={{ paddingX: 0.8 }}
                        />
                      ))}
                    </Tabs>
                  )}
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
