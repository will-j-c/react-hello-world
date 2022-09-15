import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tab,
  Tabs,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import TitleHomepage from "../title-homepage/TitleHomepage";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent";

function SiteHeader() {
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [valueNavbar, setValueNavbar] = useState(isNaN);
  const [valueAuth, setValueAuth] = useState(undefined);
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
                  value={valueNavbar}
                  onChange={(e, val) => setValueNavbar(val)}
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab label="Products " to="/register" component={Link} />
                  <Tab label="Community" to="/register" component={Link} />
                  <Tab label="Contributors" to="/register" component={Link} />
                </Tabs>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Box display="flex">
                  <Tabs
                    value={valueAuth}
                    onChange={(e, val) => setValueAuth(val)}
                    textColor="inherit"
                    indicatorColor="secondary"
                  >
                    <Tab label="Login " to="/register" component={Link} />
                    <Tab label="Sign up " to="/register" component={Link} />
                  </Tabs>
                  {/* <Button
                    sx={{ marginLeft: 1, background: "var(--color3)" }}
                    variant="contained"
                  >
                    Signup
                  </Button> */}
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
