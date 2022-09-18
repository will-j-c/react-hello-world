import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import ProjectCard from "../cards/project-card/ProjectCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UserAcceptedProjects() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [UserAcceptedProjects, setUserAcceptedProjects] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get(`/users/${username}/projects/accepted`)
      .then((response) => {
        setUserAcceptedProjects(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, []);
  let UserAcceptedProjectsCards = [];
  if (UserAcceptedProjects?.length) {
    UserAcceptedProjectsCards = UserAcceptedProjects?.map((project, idx) => {
      const projectCardDetails = {
        projectImg: project.image_urls[0],
        title: project.title,
        tagline: project.tagline,
        logo: project.logo_url,
        categories: project.categories,
        slug: project.slug,
      };
      return (
        <Grid key={idx} item xs={12} sm={6} md={4}>
          <ProjectCard details={projectCardDetails} />
        </Grid>
      );
    });
  }
  return (
    <Grid container spacing={2} marginTop={4}>
      {UserAcceptedProjectsCards}
    </Grid>
  );
}

export default UserAcceptedProjects;