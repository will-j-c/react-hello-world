import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import axios from "../../api/axios";
import ProjectCard from "../cards/project-card/ProjectCard";

function ProfileAboutPanel(props) {
  const params = useParams();
  const username = params.username;
  const [projectsPublic, setProjectsPublic] = useState([]);
  const [projectsAccepted, setProjectsAccepted] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${username}/projects/public`)
      .then((response) => {
        setProjectsPublic(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, [params]);
  useEffect(() => {
    axios
      .get(`/users/${username}/projects/accepted`)
      .then((response) => {
        setProjectsAccepted(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, [params]);

  if (props.profile) {
    const { skills, interests } = props.profile;
    const skillsToDisplay = skills.length ? (
      skills.map((skill, idx) => {
        return (
          <Box
            key={idx}
            sx={{ backgroundColor: "var(--color7a)" }}
            padding={1}
            marginRight={1}
            borderRadius={1}
          >
            {skill}
          </Box>
        );
      })
    ) : (
      <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
        Nothing here yet!
      </Typography>
    );

    const interestsToDisplay = interests.length ? (
      interests.map((interest, idx) => {
        return (
          <Box
            key={idx}
            sx={{ backgroundColor: "var(--color7a)" }}
            padding={1}
            marginRight={1}
            borderRadius={1}
          >
            {interest}
          </Box>
        );
      })
    ) : (
      <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
        Nothing here yet!
      </Typography>
    );
    //Logic to show only accepted Public projects
    const projectsAcceptedPublic = projectsAccepted?.filter(
      (item) => item.state === "published"
    );
    let projectsToShow = [...projectsPublic, ...projectsAcceptedPublic];
    let projectCardsToShow = null;

    if (projectsToShow?.length) {
      const baseProjectImage =
        "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
      const baseProjectLogo =
        "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

      projectCardsToShow = projectsToShow?.map((project, idx) => {
        const projectCardDetails = {
          projectImg: project.image_urls[0] || baseProjectImage,
          title: project.title,
          tagline: project.tagline,
          logo: project.logo_url,
          categories: project.categories || baseProjectLogo,
          slug: project.slug,
          projectOwner: username,
          state: project.state,
        };
        return (
          <Grid key={idx} item xs={12} sm={6} md={4}>
            <ProjectCard project={projectCardDetails} />
          </Grid>
        );
      });
    }

    return (
      <Box marginTop={2}>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          About me:
        </Typography>
        <Box sx={{ backgroundColor: "var(--color1)" }} padding={2}>
          <Typography sx={{ color: "var(--color4)" }} variant={"body2"}>
            {"about_me about_meabout_meabout_meabout_me" || "Nothing here yet!"}
          </Typography>
        </Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Skills:
        </Typography>
        <Box display={"flex"}>{skillsToDisplay}</Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Interests:
        </Typography>
        <Box display={"flex"}>{interestsToDisplay}</Box>

        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Projects:
        </Typography>
        <Grid container spacing={2}>
          {projectCardsToShow ? (
            projectCardsToShow
          ) : (
            <Typography sx={{ color: "var(--color3)" }}>
              My Project is comming soon
            </Typography>
          )}
        </Grid>
      </Box>
    );
  }
}

export default ProfileAboutPanel;
