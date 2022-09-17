import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import AvatarComponent from "../avatar/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";

import ProfileShowTabs from "../profile-show-tabs/ProfileShowTabs";
import ProfileAboutPanel from "../profile-about-panel/ProfileAboutPanel";
import ProfileConnectionPanel from "../profile-connection-panel/ProfileConnectionPanel";
import ProfileMyProjectsPanel from "../profile-my-projects-panel/ProfileMyProjectsPanel";
import ProfileOtherProjectsPanel from "../profile-other-projects-panel/ProfileOtherProjectsPanel";

import AuthContext from "../../context/AuthProvider";

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
  // console.log("projectAccprojectAccepted: ", projectAccepted);

  // Logic for handling tabs
  useEffect(() => {
    if (profile) {
      return setPanel(
        <ProfileAboutPanel
          profile={profile}
          projectPublic={projectPublic}
          projectAccepted={projectAccepted}
        />
      );
    }
  }, [profile]);
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    switch (newTabValue) {
      case "1":
        setPanel(
          <ProfileAboutPanel
            profile={profile}
            projectPublic={projectPublic}
            projectAccepted={projectAccepted}
          />
        );
        break;
      case "2":
        setPanel(<ProfileConnectionPanel profile={profile} />);
        break;
      case "3":
        setPanel(
          <ProfileMyProjectsPanel
            projectPublic={projectPublic}
            projectAccepted={projectAccepted}
          />
        );
        break;
      case "4":
        setPanel(<ProfileOtherProjectsPanel profile={profile} />);
        break;
      default:
        setPanel(<ProfileAboutPanel profile={profile} />);
    }
    // return;
  };

  return profile ? (
    <>
      <Container>
        <Box display={"flex"} marginTop={5}>
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
            <Typography
              variant="h4"
              component="h4"
              sx={{ color: "var(--color3)", textTransform: "capitalize" }}
            >
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
          <Box marginLeft="auto">
            <EditIcon
              sx={{
                marginY: 1,
                color: "var(--color2)",
                "&:hover": {
                  color: "var(--color3a)",
                },
              }}
              fontSize={"large"}
            />
          </Box>
        </Box>

        <Box
          sx={{
            border: "solid 1px var(--color3)",
            backgroundColor: "var(--color2)",
          }}
          paddingX={4}
          paddingBottom={4}
          id="panel-box"
        >
          <ProfileShowTabs
            tabValue={tabValue}
            handleTabChange={handleTabChange}
          />
          {profile ? panel : ""}
        </Box>

        {/* <Grid
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
              <ProfileShowTabs
                tabValue={tabValue}
                handleTabChange={handleTabChange}
              />
              {profile ? panel : ""}
            </Box>
          </Grid>
          <Grid item></Grid>
        </Grid> */}
      </Container>
    </>
  ) : (
    ""
  );
}

export default ProfilePage;
