import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import ProjectCard from "../cards/project-card/ProjectCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UserAppliedProjects() {
  const params = useParams();
  const username = params.username;
  const axiosPrivate = useAxiosPrivate();

  const [UserAppliedProjects, setUserAppliedProjects] = useState([]);
  const [ followedProjects, setFollowedProjects ] = useState([]);


  useEffect(() => {
    axiosPrivate
      .get(`/users/${username}/projects/applied`)
      .then((response) => {
        setUserAppliedProjects(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, []);
  useEffect(() => {
    axiosPrivate
      .get(`/users/${username}/projects/following`)
      .then((response) => {
        setFollowedProjects(response.data.map(
          relation => relation.slug
        ));
      })
      .catch((err) => {
      });
  }, [params]);
  let UserAppliedProjectsCards = [];
  const baseProjectImage =
    "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
  const baseProjectLogo =
    "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";
  if (UserAppliedProjects?.length) {
    UserAppliedProjectsCards = UserAppliedProjects?.map((project, idx) => {
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
          <ProjectCard project={projectCardDetails} followed={followedProjects?.includes(project.slug)}/>
        </Grid>
      );
    });
  }
  return (
    <Grid container spacing={2} marginTop={4}>
      {UserAppliedProjectsCards}
    </Grid>
  );
}

export default UserAppliedProjects;
