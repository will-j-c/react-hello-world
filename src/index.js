import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginGrid from "./components/login-grid/LoginGrid";
import "./index.css";
import App from "./App";
import TitleHomepage from "./components/title-homepage/TitleHomepage";
import ProfilePage from "./components/profile-page/ProfilePage";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path="register"
                element={<LoginGrid formType="register" />}
              />
              <Route path="login" element={<LoginGrid formType="login" />} />
              <Route path="" element={<TitleHomepage />} />'
              <Route path="/:username" element={<ProfilePage />} />
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
      </StyledEngineProvider>
    </AuthProvider>
  </React.StrictMode>
);
