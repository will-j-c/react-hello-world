import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import Button from "../buttons/Button.jsx";
import ProjectCard from "../cards/project-card/ProjectCard";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Typography } from "@mui/material";

function ProjectIndexPage() {
  const [categories, setCategories] = useState([]);
  const getFilter = (categoryArr) => {
    return setCategories(categoryArr);
  }
  return (
    <>
      <Typography
        variant="h2"
        textAlign={"center"}
        marginY={4}
        sx={{ color: "var(--color3)", fontWeight: "bold" }}
      >
        Projects
      </Typography>
      <Box></Box>
      <ProjectIndexGrid getFilter={getFilter}/>
    </>
  );
}

export default ProjectIndexPage;
