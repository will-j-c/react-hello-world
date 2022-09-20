import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ProfileConnectionFollowerPanel from "./ProfileConnectionFollowerPanel";
import ProfileConnectionFollowingPanel from "./ProfileConnectionFollowingPanel";
import { ShowTabsConnection } from "../profile-show-tabs/ProfileShowTabs";

function ProfileConnectionPanel(props) {
  const params = useParams();
  // Logic for handling tabs
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  useEffect(() => {
    setTabValue("1");
    return setPanel(<ProfileConnectionFollowingPanel />);
  }, [params.username]);

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
