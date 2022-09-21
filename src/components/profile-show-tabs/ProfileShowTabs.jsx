import { useParams } from "react-router-dom";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useState, useEffect, useContext } from "react";
import Tab from "@mui/material/Tab";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { NoEncryption } from "@mui/icons-material";

const themeTab = createTheme({
  components: {
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
          height: 0,
          paddingTop: 1,
          paddingBottom: 1,
          marginRight: 10,
          borderRadius: 5,
          backgroundColor: "var(--color1)",
          color: "var(--color4)",
          minHeight: 38,
          
          "&.Mui-selected": {
            backgroundColor: "var(--color3)",
            fontWeight: "bold",
            color: "var(--color1)",
          },
        },
      },
    },
  },
});

function ProfileShowTabs(props) {
  const isAuth = props.isAuth;
  return (
    <Tabs
      value={props.tabValue}
      onChange={props.handleTabChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
    >
      <Tab value="1" label="Profile" />
      <Tab value="2" label="Connection" />
      {isAuth && <Tab value="3" label="My projects" />}
      {isAuth && <Tab value="4" label="Other projects" />}
    </Tabs>
  );
}
function ShowTabsConnection(props) {
  return (
    <ThemeProvider theme={themeTab}>
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab
        value="1"
        label="Following"
        className="small-tab"
      />
      <Tab value="2" label="Followers" className="small-tab" />
    </Tabs>
    </ThemeProvider>
  );
}
function ShowTabsOtherProjects(props) {
  return (
    <ThemeProvider theme={themeTab}>
      <Tabs value={props.tabValue} onChange={props.handleTabChange}>
        <Tab value="1" label="Working on" />
        <Tab value="2" label="Applied projects" />
        <Tab value="3" label="Following projects" />
      </Tabs>
    </ThemeProvider>
  );
}

export { ProfileShowTabs, ShowTabsConnection, ShowTabsOtherProjects };
