import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ProfileConnectionFollowerPanel from "../profile-connection-follower-panel/ProfileConnectionFollowerPanel";
import ProfileConnectionFollowingPanel from "../profile-connection-following-panel/ProfileConnectionFollowingPanel";
import { ShowTabsConnection } from "../profile-show-tabs/ProfileShowTabs";
import "./ProfileConnectionPanel.css";

function ProfileConnectionPanel(props) {
  let userFollowings = props.userFollowings;
  let userFollowers = props.userFollowers;
  // Logic for handling tabs
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  useEffect(() => {
    return setPanel(<ProfileConnectionFollowingPanel />);
  }, [userFollowings]);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    return newTabValue === "1"
      ? setPanel(<ProfileConnectionFollowingPanel />)
      : setPanel(<ProfileConnectionFollowerPanel />);
  };
  return (
    <Box marginY={4}>
      <ShowTabsConnection
        tabValue={tabValue}
        handleTabChange={handleTabChange}
      />
      {panel}
    </Box>
  );
}

export default ProfileConnectionPanel;
