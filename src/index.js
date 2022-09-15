import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginGrid from "./components/login-grid/LoginGrid";
import "./index.css";
import App from "./App";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import HomeGrid from "./components/home-grid/HomeGrid";

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
            <Route path="" element={<HomeGrid baseUrl={baseUrl}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
