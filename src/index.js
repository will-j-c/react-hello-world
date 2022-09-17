import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginGrid from './components/login-grid/LoginGrid';
import "./index.css";
import App from "./App";
import TitleHomepage from "./components/title-homepage/TitleHomepage";
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthProvider';

const baseUrl = 'http://localhost:8800';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="register" element={<LoginGrid baseUrl={baseUrl} formType="register" />} />
              <Route path="login" element={<LoginGrid baseUrl={baseUrl} formType="login"/>} />
              <Route path="" element={<TitleHomepage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </AuthProvider>
  </React.StrictMode>
);
