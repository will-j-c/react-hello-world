import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import ProjectCard from "../cards/project-card/ProjectCard";
import Button from "../buttons/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./ProfileMyProjectsPanel.css";

function ProfileMyProjectsPanel(props) {
  if (props.userProjects) {
    const projectsToShow = props.userProjects;
    const baseProjectImage =
      "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
    const baseProjectLogo =
      "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";
    const projectCardsToShow = projectsToShow?.map((project, idx) => {
      const projectCardDetails = {
        projectImg: project.image_urls[0] || baseProjectImage,
        title: project.title,
        tagline: project.tagline,
        logo: project.logo_url,
        categories: project.categories || baseProjectLogo,
        slug: project.slug,
      };
      return (
        <Grid key={idx} item xs={12} sm={6} md={4}>
          <ProjectCard details={projectCardDetails} />
        </Grid>
      );
    });
    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginY={5}
        >
          <AddCircleOutlineIcon
            sx={{ marginY: 1, color: "var(--color4)" }}
            fontSize={"large"}
          />
          <Button
            category={"action"}
            title={"Add new project"}
            variant={"outlined"}
            route={`/projects/create`} //BUG: whyyyyy the link on browser is : "http://localhost:3000/projects/creat?page=1"
          />
        </Box>
        <Grid container spacing={2}>
          {projectCardsToShow}
        </Grid>
      </>
    );
  }
}

export default ProfileMyProjectsPanel;
