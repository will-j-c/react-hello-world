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
    {/* <StyledEngineProvider injectFirst> */}
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App baseUrl={baseUrl} />}>
            <Route
              path="register"
              element={<LoginGrid baseUrl={baseUrl} formType="register" />}
            />
            <Route
              path="login"
              element={<LoginGrid baseUrl={baseUrl} formType="login" />}
            />
            <Route path="projects">
              <Route
                path={":slug"}
                element={<ProjectShowGrid baseUrl={baseUrl} />}
              />
              <Route index element={<ProjectShowGrid baseUrl={baseUrl} />} />
            </Route>
            <Route index element={<HomeGrid baseUrl={baseUrl} />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p style={{ color: "white" }}>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    {/* </StyledEngineProvider> */}
  </React.StrictMode>
);
