import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


export default function ContributorShowTabs(props) {
  return (
    <Tabs value={props.tabValue} onChange={props.handleTabChange}>
      <Tab value="1" label="About" />
      <Tab value="2" label="Applicants" />
    </Tabs>
  )
}