import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import { ShowTabsOtherProjects } from "../profile-show-tabs/ProfileShowTabs";
import UserAcceptedProjects from "./UserAcceptedProjects";
import UserAppliedProjects from "./UserAppliedProjects";

function ProfileOtherProjectsPanel() {
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  // useEffect(() => {
  //   return setPanel(<UserAcceptedProjects />);
  // }, []);

  // const handleTabChange = (event, newTabValue) => {
  //   setTabValue(newTabValue);
  //   return newTabValue === "1"
  //     ? setPanel(<UserAcceptedProjects />)
  //     : setPanel(<UserAcceptedProjects />);
  // };
  return (
    <Box marginY={4}>
      {/* <ShowTabsOtherProjects
        tabValue={tabValue}
        handleTabChange={handleTabChange}
      /> */}
      {UserAcceptedProjects}
      {UserAppliedProjects}
    </Box>
  );
}

export default ProfileOtherProjectsPanel;
