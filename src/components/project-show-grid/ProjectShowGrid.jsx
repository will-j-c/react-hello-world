import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AvatarComponent from "../avatar/Avatar";
import ProjectAboutPanel from "../project-about-panel/ProjectAboutPanel";
import ProjectContributorsPanel from "../project-contributors-panel/ProjectContributorsPanel";

function ProjectShowGrid(props) {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const [project, setProject] = useState(null);
  const [contributors, setContributors] = useState(null);
  const [creator, setCreator] = useState(null);
  const [comments, setComments] = useState(null);
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  const baseProjectLogo =
    "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";
  useEffect(() => {
    axios.get(`${props.baseUrl}/api/v1/projects/${slug}`).then(
      (response) => {
        setProject(response.data.project);
        setContributors(response.data.jobs);
        setCreator(response.data.createdBy);
      },
      (error) => {
        // setIsLoaded(true);
        // setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (project) {
      return setPanel(<ProjectAboutPanel project={project} />);
    }    
  }, [project]);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    return newTabValue === "1" ? setPanel(<ProjectAboutPanel project={project} />) : setPanel(<ProjectContributorsPanel />)
  };
  return project ? (
    <>
      <Box display={"flex"}>
        <AvatarComponent
          imgAlt={project.title}
          imgUrl={project.logo_url || baseProjectLogo}
          sx={{ width: 128, height: 128, border: "solid 1px var(--color3)" }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          marginLeft={5}
        >
          <Typography sx={{ color: "var(--color3)" }}>
            {project.title}
          </Typography>
          <Typography sx={{ color: "var(--color4)" }}>
            {project.tagline}
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        spacing={8}
        columns={{ xs: 1, md: 12 }}
        justifyContent="center"
      >
        <Grid md={8} item>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value="1" label="About" />
            <Tab value="2" label="Contributors" />
          </Tabs>
          {project ? panel : ''}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  ) : (
    ""
  );
}

export default ProjectShowGrid;
