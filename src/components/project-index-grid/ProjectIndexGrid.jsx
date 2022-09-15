import Grid from "@mui/material/Unstable_Grid2";
import ProjectCard from "../project-card/ProjectCard";
import { useState, useEffect } from "react";
import axios from "axios";

function ProjectIndexGrid(props) {
  const [projects, setProjects] = useState([]);
  const baseProjectImage =
    "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
  const baseProjectLogo = 'https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png';
  useEffect(() => {
    axios.get(`${props.baseUrl}/api/v1/projects`).then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);
  const projectCardsToShow = projects.map((project, idx) => {
    const projectCardDetails = {
      projectImg: project.image_urls[0] || baseProjectImage,
      title: project.title,
      tagline: project.tagline,
      logo: project.logo_url,
      categories: project.categories || baseProjectLogo,
    };
    return (
      <Grid key={idx} xs={true} md={true} item>
        <ProjectCard details={projectCardDetails} />
      </Grid>
    );
  });
  return (
    <Grid
      container
      spacing={4}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      {projectCardsToShow}
    </Grid>
  );
}

export default ProjectIndexGrid;
