import Grid from "@mui/material/Unstable_Grid2";
import ProjectCard from "../cards/project-card/ProjectCard";
import { useState, useEffect } from "react";
import axios from '../../api/axios';

function ProjectIndexGrid(props) {
  const [projects, setProjects] = useState([]);
  const baseProjectImage =
    "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
  const baseProjectLogo = 'https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png';
  useEffect(() => {
    axios.get('projects').then((response) => {
      setProjects(response.data);
    }, (error) => {
      console.log(error);
    });
    if (props.getFilter) {
      console.log(projects)
      const categoryFilters = projects.map(project => {
        const categories = [];
        project.categories.forEach(category => {
          categories.push(category);
        })
        return categories;
      })
      const uniqueCategories = [...new Set(...categoryFilters)]
      console.log(categoryFilters.flat(1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const projectCardsToShow = projects.map((project, idx) => {
    const projectCardDetails = {
      projectImg: project.image_urls[0] || baseProjectImage,
      title: project.title,
      tagline: project.tagline,
      logo: project.logo_url,
      categories: project.categories || baseProjectLogo,
      slug: project.slug
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
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      {projectCardsToShow}
    </Grid>
  );
}

export default ProjectIndexGrid;
