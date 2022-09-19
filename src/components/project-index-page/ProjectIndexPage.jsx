import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import Button from "../buttons/Button.jsx";
import ProjectCard from "../cards/project-card/ProjectCard";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Typography } from "@mui/material";
import './ProjectIndexPage.scss';

function ProjectIndexPage() {
  const [categories, setCategories] = useState([]);
  const getFilter = (categoryArr) => {
    return setCategories(categoryArr);
  }
  return (
    <>
      <Grid 
        container
        spacing={4}
        columns={{ xs: 1, md: 12 }}
        justifyContent="space-between"
        marginTop={4}
      >
        <Grid md={2} item className='filters'>
          <Typography variant='h6' component='h2' color='white'>
            Filters
          </Typography>
        </Grid>

        <Grid md={10} sx={{ height: "100%" }} paddingTop={0} item border='1px solid green'>
          <Typography
            variant="h4"
            component='h1'
            textAlign={"center"}
            marginY={4}
            sx={{ color: "var(--color3)", fontWeight: "bold" }}
          >
            Projects
          </Typography>
          <ProjectIndexGrid getFilter={getFilter}/>
        </Grid>
      </Grid> 
    </>
  );
}

export default ProjectIndexPage;
