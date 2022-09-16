import { Link } from "react-router-dom";
import { Tab, Tabs, Grid, useTheme, useMediaQuery, List } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import TitleHomepage from "../title-homepage/TitleHomepage";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent";
import { flexbox } from "@mui/system";

function SiteHeader() {
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Logout", "Delete Account"];
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [valueNavbar, setValueNavbar] = useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--color1)" }}>
      <Container maxWidth="xl">
        <Toolbar>
          {isMatch ? (
            <>
              <Grid item xs={2}>
                <Link to="/">Hello world</Link>
              </Grid>

              <DrawerComponent />
            </>
          ) : (
            <>
              <AdbIcon sx={{ mr: 1 }} />
              <Grid container sx={{ placeItems: "center" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "Roboto mono",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "var(--color3)",
                    textDecoration: "none",
                  }}
                >
                  Hello World
                </Typography>

                <Grid item sx={{ marginLeft: "auto", color: "var(--color4)" }}>
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
                    <Tab
                      label="Products "
                      to="/"
                      component={Link}
                      sx={{ paddingX: 1.2 }}
                    />
                    <Tab
                      label="Community"
                      to="/"
                      component={Link}
                      sx={{ paddingX: 1.2 }}
                    />
                    <Tab
                      label="Contributors"
                      to="/"
                      component={Link}
                      sx={{ paddingLeft: 1.2, Right: 0 }}
                    />
                    <Tab
                      label="Login "
                      to="/"
                      component={Link}
                      sx={{ paddingRight: 0 }}
                    />
                    <Typography
                      variant="h5"
                      component="h6"
                      sx={{
                        flexGrow: 1,
                        fontFamily: "monospace",
                        cursor: "pointer",
                      }}
                    >
                      |
                    </Typography>
                    <Tab
                      label="Sign up "
                      to="/register"
                      component={Link}
                      sx={{ paddingLeft: 0 }}
                    />
                  </Tabs>
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SiteHeader;
