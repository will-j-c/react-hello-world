import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { createTheme } from "@mui/material";

import TitleHomepage from "../title-homepage/TitleHomepage";

const theme = createTheme(() => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));
function SiteHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--color1)" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            backgroundColor: "var(--color1)",
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          <Link to="/">
            <TitleHomepage variant="h6" />
          </Link>
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginLeft: theme.spacing(10),
            display: "flex",
          }}
        >
          <Button
            sx={{
              textDecoration: "none",
              color: "white",
              fontSize: "20px",
              marginLeft: theme.spacing(20),
              "&:hover": {
                color: "yellow",
                borderBottom: "1px solid white",
              },
            }}
          >
            <Link to="/">Products</Link>
          </Button>
          <Link to="/">Community</Link>
          <Link to="/">Contributors</Link>
          <Link to="/">Login</Link>
          <Link to="/">Signup</Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
