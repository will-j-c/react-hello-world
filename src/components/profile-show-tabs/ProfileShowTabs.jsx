import { useParams } from "react-router-dom";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useState, useEffect, useContext } from "react";
import Tab from "@mui/material/Tab";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
      // sx={{
      //   [`& .${tabsClasses.scrollButtons}`]: {
      //     "&.Mui-disabled": { opacity: 0.7, color: "white" },
      //   },
      // }}
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
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab
        value="1"
        label="Following"
        className="small-tab"
        // sx={{ backgroundColor: "white", color: "red" }}
      />
      <Tab value="2" label="Followers" className="small-tab" />
    </Tabs>
  );
}
function ShowTabsOtherProjects(props) {
  return (
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab value="1" label="Working on" />
      <Tab value="2" label="Applied projects" />
      <Tab value="3" label="Following projects" />
    </Tabs>
  );
}

export { ProfileShowTabs, ShowTabsConnection, ShowTabsOtherProjects };
