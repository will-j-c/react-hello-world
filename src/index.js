import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginGrid from "./components/login-grid/LoginGrid";
import "./index.css";
import App from "./App";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import HomeGrid from "./components/home-grid/HomeGrid";
import ProjectShowGrid from "./components/project-show-grid/ProjectShowGrid";
import { StyledEngineProvider } from "@mui/material/styles";

const baseUrl = "http://localhost:8800";
const theme = createTheme({
  components: {
    typograpy: {
      fontFamily: "Roboto Mono, monospace",
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color4)",
          color: "var(--color2)",
          fontWeight: "bold",
          "&.Mui-selected": {
            backgroundColor: "var(--color2)",
            color: "var(--color3)",
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path="register"
                element={<LoginGrid baseUrl={baseUrl} />}
              />
              <Route path="projects">
                <Route
                  path=":slug"
                  element={<ProjectShowGrid baseUrl={baseUrl} />}
                />
              </Route>
              <Route index element={<HomeGrid baseUrl={baseUrl} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);
