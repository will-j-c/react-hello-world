import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginGrid from "./components/login-grid/LoginGrid";
import "./index.css";
import App from "./App";
import TitleHomepage from "./components/title-homepage/TitleHomepage";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const baseUrl = "http://localhost:8800";
const theme = createTheme({
  typograpy: {
    fontFamily: 'Roboto Mono, monospace',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="register" element={<LoginGrid baseUrl={baseUrl} />} />
            <Route path="" element={<TitleHomepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
