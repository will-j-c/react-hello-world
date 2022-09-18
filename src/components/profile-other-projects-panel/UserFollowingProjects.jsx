import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import ProjectCard from "../cards/project-card/ProjectCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UserFollowingProjects() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [UserFollowingProjects, setUserFollowingProjects] = useState([]);

  useEffect(() => {
    if (profileOwnerName === username) {
      axiosPrivate
        .get(`/users/${username}/projects`)
        .then((response) => {
          console.log("hehe");
          setUserFollowingProjects(response.data);
        })
        .catch((err) => {
          console.log(err.response);
          // toast(err.response.data.message);
        });
    }
  }, []);
  let UserFollowingProjectsCards = [];
  if (UserFollowingProjects?.length) {
    UserFollowingProjectsCards = UserFollowingProjects?.map((project, idx) => {
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
          <ProjectCard project={projectCardDetails} />
        </Grid>
      );
    });
  }
  return (
    <Grid container spacing={2} marginTop={4}>
      {UserFollowingProjectsCards}
    </Grid>
  );
}

export default UserFollowingProjects;
