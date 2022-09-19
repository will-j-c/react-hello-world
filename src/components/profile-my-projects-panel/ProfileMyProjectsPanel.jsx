import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import ProjectCard from "../cards/project-card/ProjectCard";
import Button from "../buttons/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DeleteModal from "../modals/DeleteModal";
// TODO: handle the case to show button project Draft , Public , ...

function ProfileMyProjectsPanel(props) {
  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;
  const [userProjects, setUserProjects] = useState([]);
  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  useEffect(() => {
    axiosPrivate
      .get(`/users/${username}/projects`)
      .then((response) => {
        setUserProjects(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, [params]);
  let projectCardsToShow = [];

  if (userProjects?.length) {
    const baseProjectImage =
      "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
    const baseProjectLogo =
      "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

    projectCardsToShow = userProjects?.map((project, idx) => {
      const projectCardDetails = {
        projectImg: project.image_urls[0] || baseProjectImage,
        title: project.title,
        tagline: project.tagline,
        logo: project.logo_url,
        categories: project.categories || baseProjectLogo,
        slug: project.slug,
        projectOwner: profileOwnerName,
        state: project.state,
      };
      return (
        <Grid key={idx} item xs={12} sm={6} md={4}>
          <ProjectCard 
            project={projectCardDetails}
            triggerDeleteModal={() => setModalIsOpen(true)}
          />
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
            route={`/projects/create`}
          />
        </Box>
        <Grid container spacing={2}>
          {projectCardsToShow}
        </Grid>
        <DeleteModal 
        isOpen={modalIsOpen} 
        onClose={() => setModalIsOpen(false)}
        />
      </>
    );
  }
}

export default ProfileMyProjectsPanel;
