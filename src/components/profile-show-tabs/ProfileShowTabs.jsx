import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function ShowTabs(props) {
  return (
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab value="1" label="Profile" />
      <Tab value="2" label="Connection" />
      <Tab value="3" label="My projects" />
      <Tab value="4" label="Other projects" />
    </Tabs>
  );
}

export default ShowTabs;
