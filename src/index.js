import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthProvider";
import LogOut from "./components/logout/LogOut";
import App from "./App";
import "./index.css";
import LoginGrid from "./components/login-grid/LoginGrid";
import UserIndexGrid from "./components/user-index-grid/UserIndexGrid";
import ContributorIndexGrid from "./components/contributor-index-grid/ContributorIndexGrid";
import HomeGrid from "./components/home-grid/HomeGrid";
import ProjectShowGrid from "./components/project-show-grid/ProjectShowGrid";
import TitleHomepage from "./components/title-homepage/TitleHomepage";
import ProjectIndexGrid from "./components/project-index-grid/ProjectIndexGrid";
import ContributorShow from "./components/contributor-show/ContributorShow";
import ProfilePage from "./components/profile-page/ProfilePage";
import ProfileEdit from "./components/profile-edit/ProfileEdit";
import MultiForm from "./components/project-form/MultiForm";
import ProjectIndexPage from "./components/project-index-page/ProjectIndexPage.jsx";
import Activation from "./components/activation/Activation";
import ContributorForm from "./components/contributor-form/ContributorForm";

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  path="register"
                  element={<LoginGrid formType="register" />}
                />
                <Route path="login" element={<LoginGrid formType="login" />} />
                <Route path="logout" element={<LogOut />} />
                <Route path="users" element={<UserIndexGrid />} />
                <Route path="users/:username" element={<ProfilePage />} />
                <Route path="users/:username/edit" element={<ProfileEdit />} />
                <Route
                  path="users/activate/:activateToken"
                  element={<Activation />}
                />
                <Route path="contributors" element={<ContributorIndexGrid />} />
                <Route path="projects">
                  <Route path=":slug" element={<ProjectShowGrid />} />
                  <Route path=":slug/edit" element={<MultiForm />} />
                  <Route path="create" element={<MultiForm />} />
                  <Route index element={<ProjectIndexPage />} />
                </Route>
                <Route path="contributors">
                  <Route path=":id" element={<ContributorShow />} />
                  <Route path=":id/edit" element={<ContributorForm />} />
                </Route>
                <Route path="" element={<HomeGrid />} />
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
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
