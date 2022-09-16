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
import MenuBar from "./MenuBar";

function SiteHeader() {
  const token = true;
  const pages = token
    ? ["Products", "Community", "Contributors", "Login", "Signup"]
    : ["Products", "Community", "Contributors"];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [valueNavbar, setValueNavbar] = useState(0);

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
                  component={Link}
                  to="/"
                  sx={{
                    mr: 2,
                    fontFamily: "Roboto mono",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "var(--color3)",
                    textDecoration: "none",
                  }}
                >
                  <TitleHomepage variant="h5" marginTop="0" />
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
                    {pages.map((page, index) => (
                      <Tab
                        key={index}
                        label={page}
                        to={`/${page}`}
                        component={Link}
                        sx={{ paddingX: 1.2 }}
                      />
                    ))}
                  </Tabs>
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 0 }}>
                <MenuBar />
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SiteHeader;
