import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import AvatarComponent from "../avatar/Avatar";
import ProjectAboutPanel from "../project-about-panel/ProjectAboutPanel";
import ProjectContributorsPanel from "../project-contributors-panel/ProjectContributorsPanel";
import ShowTabs from "../show-tabs/ShowTabs";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AuthContext from "../../context/AuthProvider";

import "./ProjectShowGrid.css";
import "./ProfilePage.scss";
import axios from "../../api/axios";

const baseProfileAvatar =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

function ProfilePage(props) {
  const params = useParams();
  const username = params.username;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [projectPublic, setProjectPublic] = useState(null);
  const [projectAccepted, setProjectAccepted] = useState(null);

  useEffect(() => {
    axios.get(`/users/${username}`).then((response) => {
      setProfile(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/users/${username}/projects/public`).then((response) => {
      setProjectPublic(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/users/${username}/projects/accepted`).then((response) => {
      setProjectAccepted(response.data);
    });
  }, []);
  // console.log("profile: ", profile);
  // console.log("projectPublic: ", projectPublic);
  // console.log("projectAccprojectAccepted: ", projectAccepted);

  // Logic for handling tabs
  // useEffect(() => {
  //   if (project) {
  //     return setPanel(<ProjectAboutPanel project={project} />);
  //   }
  // }, [project]);
  // const [tabValue, setTabValue] = useState("1");
  // const [panel, setPanel] = useState(null);
  // const handleTabChange = (event, newTabValue) => {
  //   setTabValue(newTabValue);
  //   return newTabValue === "1"
  //     ? setPanel(<ProjectAboutPanel project={project} />)
  //     : setPanel(
  //         <ProjectContributorsPanel
  //           creator={creator}
  //           contributors={contributors}
  //         />
  //       );
  // };

  return profile ? (
    <>
      <Box display={"flex"}>
        <AvatarComponent
          imgAlt={profile.username}
          imgUrl={profile.profile_pic_url || baseProfileAvatar}
          sx={{ width: 128, height: 128, border: "solid 1px var(--color3)" }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          marginLeft={5}
        >
          <Typography sx={{ color: "var(--color3)" }}>
            {profile.username}
          </Typography>
          <Typography sx={{ color: "var(--color4)" }}>
            {profile.tagline || "Hello world"}
          </Typography>
          <Box>
            <GitHubIcon
              sx={{ marginY: 1, color: "var(--color4)" }}
              fontSize={"large"}
            />
            <LinkedInIcon
              sx={{ marginY: 1, color: "var(--color4)" }}
              fontSize={"large"}
            />
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={8}
        columns={{ xs: 1, md: 12 }}
        justifyContent="space-between"
        marginTop={4}
      >
        <Grid md={8} alignSelf={"flex-start"} item>
          <Box
            sx={{
              border: "solid 1px var(--color3)",
              backgroundColor: "var(--color2)",
            }}
            paddingX={4}
            paddingBottom={4}
            id="panel-box"
          >
            {/* <ShowTabs tabValue={tabValue} handleTabChange={handleTabChange} />
            {profile ? panel : ""} */}
          </Box>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  ) : (
    ""
  );
}

export default ProfilePage;
