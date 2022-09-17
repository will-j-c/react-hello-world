import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";

function ShowTabs(props) {
  return (
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab value="1" label="About" />
      <Tab value="2" label="Contributors" />
    </Tabs>
  );
}

export default ShowTabs;
