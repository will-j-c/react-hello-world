import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Stack,
  Button,
  Tab,
  Tabs,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material";

import TitleHomepage from "../title-homepage/TitleHomepage";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent";

function SiteHeader() {
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const [value, setValue] = useState(0);
  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--color1)" }}>
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
            <Grid container sx={{ placeItems: "center" }}>
              <Grid item xs={2}>
                <Link to="/">Hello world</Link>
              </Grid>
              <Grid item xs={5}>
                <Tabs
                  value={value}
                  onChange={(e, val) => setValue(val)}
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab label="Products " />
                  <Tab label="Community" />
                  <Tab label="Contributors" />
                </Tabs>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Box display="flex">
                  <Button
                    sx={{ marginLeft: "auto", background: "var(--color3)" }}
                    variant="contained"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ marginLeft: 1, background: "var(--color3)" }}
                    variant="contained"
                  >
                    Signup
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
