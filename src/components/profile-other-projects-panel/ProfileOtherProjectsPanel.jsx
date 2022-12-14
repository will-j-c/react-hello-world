import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import { ShowTabsOtherProjects } from "../profile-show-tabs/ProfileShowTabs";

import UserAcceptedProjects from "./UserAcceptedProjects";
import UserAppliedProjects from "./UserAppliedProjects";
import UserFollowingProjects from "./UserFollowingProjects";

function ProfileOtherProjectsPanel() {
  const params = useParams();
  const username = params.username;

  const { auth } = useContext(AuthContext);
  const authUserName = auth.username;

  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  useEffect(() => {
    setTabValue("1");
    return setPanel(<UserAcceptedProjects />);
  }, []);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    switch (newTabValue) {
      case "1":
        setPanel(<UserAcceptedProjects />);
        break;
      case "2":
        setPanel(<UserAppliedProjects />);
        break;
      case "3":
        setPanel(<UserFollowingProjects />);
        break;
      default:
        setPanel(<UserAcceptedProjects />);
    }
  };

  return (
    authUserName === username && (
      <Box marginY={4}>
        <ShowTabsOtherProjects
          tabValue={tabValue}
          handleTabChange={handleTabChange}
        />
        {panel}
      </Box>
    )
  );
}

export default ProfileOtherProjectsPanel;
