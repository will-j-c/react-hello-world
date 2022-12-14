import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarComponent from "../avatar/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from '@mui/material/useMediaQuery';

import { ProfileShowTabs } from "../profile-show-tabs/ProfileShowTabs";
import ProfileAboutPanel from "../profile-about-panel/ProfileAboutPanel";
import ProfileConnectionPanel from "../profile-connection-panel/ProfileConnectionPanel";
import ProfileMyProjectsPanel from "../profile-my-projects-panel/ProfileMyProjectsPanel";
import ProfileOtherProjectsPanel from "../profile-other-projects-panel/ProfileOtherProjectsPanel";
import Button from "../buttons/Button";

import "./ProfilePage.scss";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import LoginModal from "../modals/LoginModal";

const baseProfileAvatar =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

function ProfilePage() {
  const matches = useMediaQuery('(max-width:600px)');
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const authUserName = auth.username;
  const isAuth = authUserName === username;
  const axiosPrivate = useAxiosPrivate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Following");
  const [followStatus, setFollowStatus] = useState();
  const [authUserFollowings, setAuthUserFollowings] = useState([]);

  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {}, [followStatus]);
  useEffect(() => {
    async function getData() {
      try {
        if (authUserName) {
          const authUserFollowingResponse = await axios.get(
            `/users/${authUserName}/following`
          );
          setAuthUserFollowings(
            authUserFollowingResponse.data.map(
              (relation) => relation.followee.username
            )
          );

          setFollowStatus(authUserFollowings.includes(username));
        }
      } catch (error) {}
    }
    getData();
  });

  useEffect(() => {
    axios
      .get(`/users/${username}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {});
  }, [params.username]);
  // Logic for handling tabs
  useEffect(() => {
    if (profile) {
      setTabValue("1");
      return setPanel(<ProfileAboutPanel profile={profile} />);
    }
  }, [profile]);

  const handleMouseOver = function () {
    setButtonTitle("Unfollow");
  };

  const handleMouseLeave = function () {
    setButtonTitle("Following");
  };
  const handleFollowAction = async function () {
    try {
      if (!auth.username) {
        setModalIsOpen(true);
        return;
      }
      if (followStatus) {
        await axiosPrivate.delete(`/users/${username}/unfollow`);
        setFollowStatus(false);
      } else {
        await axiosPrivate.post(`/users/${username}/follow`);
        setFollowStatus(true);
      }
      return;
    } catch (err) {}
  };

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    switch (newTabValue) {
      case "1":
        setPanel(<ProfileAboutPanel profile={profile} />);
        break;
      case "2":
        setPanel(<ProfileConnectionPanel />);
        break;
      case "3":
        setPanel(<ProfileMyProjectsPanel />);
        break;
      case "4":
        setPanel(<ProfileOtherProjectsPanel />);
        break;
      default:
        setPanel(<ProfileAboutPanel profile={profile} />);
    }
  };

  return profile ? (
    <>
      <Container>
        <Box display={"flex"} marginTop={4}>
          <Box>
            <AvatarComponent
              imgAlt={profile.username}
              imgUrl={profile.profile_pic_url || baseProfileAvatar}
              sx={{ 
                width: matches ? 80 : 128, 
                height: matches ? 80 : 128, 
                border: "solid 1px var(--color3)" }}
            />
          </Box>
          
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={'center'}
            marginLeft={matches ? 2 : 5}
            flexWrap={"wrap"}
            flexGrow={1}
          >
            <Box>
              <Typography
                variant="h4"
                component="h4"
                sx={{ color: "var(--color3)", textTransform: "capitalize" }}
              >
                {profile.name}
              </Typography>
              <Typography sx={{ color: "var(--color4)" }}>
                {profile.tagline || "Hello world, this is my empty tagline"}
              </Typography>
              <Box>
                {profile?.socmed?.github && (
                  <a
                    href={profile?.socmed?.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon
                      sx={{ marginY: 1, color: "var(--color4)" }}
                      fontSize={"large"}
                      className="icon socmed"
                    />
                  </a>
                )}
                {profile?.socmed?.linkedin && (
                  <a
                    href={profile?.socmed?.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon
                      sx={{ marginY: 1, color: "var(--color4)" }}
                      fontSize={"large"}
                      className="icon socmed"
                    />
                  </a>
                )}

                {profile?.socmed?.twitter && (
                  <a
                    href={profile?.socmed?.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon
                      sx={{ marginY: 1, color: "var(--color4)" }}
                      fontSize={"large"}
                      className="icon socmed"
                    />
                  </a>
                )}

                {profile?.socmed?.facebook && (
                  <a
                    href={profile?.socmed?.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon
                      sx={{ marginY: 1, color: "var(--color4)" }}
                      fontSize={"large"}
                      className="icon socmed"
                    />
                  </a>
                )}
              </Box>
            </Box>
            <Box>
              {username === authUserName && (
                <Link to={`/users/${authUserName}/edit`}>
                  <EditIcon
                    sx={{
                      marginY: 1,
                      color: "var(--disable-color)",
                    }}
                    className="icon"
                    fontSize={"large"}
                  />
                </Link>
              )}
              {username !== authUserName && (
                <Button
                  category={"action"}
                  title={followStatus ? `${buttonTitle}` : "Follow"}
                  variant={followStatus ? "outlined" : "contained"}
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleFollowAction}
                  component
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            border: "solid 1px var(--color3)",
            backgroundColor: "var(--color2)",
          }}
          paddingX={4}
          paddingBottom={4}
          marginTop={4}
          id="panel-box"
        >
          <ProfileShowTabs
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            isAuth={isAuth}
          />
          {profile ? panel : ""}
        </Box>
      </Container>
      <LoginModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  ) : (
    ""
  );
}

export default ProfilePage;
