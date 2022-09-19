import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import Filters from "../filters/Filters";
import axios from '../../api/axios';

import './ProjectIndexPage.scss';

function ProjectIndexPage() {
  const [ categories, setCategories] = useState([]);
  const [ categoriesFilter, setCategoriesFilter ] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get('data/categories');
        setCategories(response.data);
      } catch (err) {
      }
    }

    getCategories();

  }, [])

  const updateCategoriesFilter = (selections) => {
    setCategoriesFilter(selections);
  }

  const clearFilters = () => {
    setCategoriesFilter([]);
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
          <Typography
            className='clear-filters-button'
            variant='caption' 
            
            onClick={clearFilters}
          >
            Clear filters
          </Typography>

          <Filters options={categories} currentSelections={categoriesFilter} updateSelections={updateCategoriesFilter} />
        </Grid>

        <Grid md={10} sx={{ height: "100%" }} paddingTop={0}>
          <Typography
            variant="h4"
            component='h1'
            textAlign={"center"}
            marginY={4}
            sx={{ color: "var(--color3)", fontWeight: "bold" }}
          >
            Projects
          </Typography>
          <ProjectIndexGrid filters={{categories: categoriesFilter}} />
        </Grid>
      </Grid> 
    </>
  );
}

export default ProjectIndexPage;
