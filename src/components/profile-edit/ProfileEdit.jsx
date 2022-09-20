import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTheme } from "@mui/material/styles";

import Button from "../buttons/Button";
import styles from "./MultiForm.module.scss";
import AvatarComponent from "../avatar/Avatar";

import axios, { axiosPrivate } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoginCheck from "../login-check/LoginCheck";

function ProfileEdit() {
  const theme = useTheme();
  const params = useParams();
  const username = params.username;

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const authUsername = auth.username;
  const isAuth = authUsername === username;

  const [currentUserData, setCurrentUserData] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState([]);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(selection, selectionsList, theme) {
    return {
      fontWeight:
        selectionsList.indexOf(selection) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      color:
        selectionsList.indexOf(selection) === -1
          ? "var(--color4)"
          : "var(--color3)",
    };
  }

  const skillsSelectChange = (event) => {
    const { value } = event.target;
    setSelectedSkills(typeof value === "string" ? value.split(",") : value);
  };

  const interestsChange = (event) => {
    setInterests(event.target.value.split(","));
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const taglineChange = (event) => {
    setTagline(event.target.value);
  };
  const aboutChange = (event) => {
    setAbout(event.target.value);
  };
  const linkedinChange = (event) => {
    setLinkedin(event.target.value);
  };
  const githubChange = (event) => {
    setGithub(event.target.value);
  };
  const twitterChange = (event) => {
    setTwitter(event.target.value);
  };
  const facebookChange = (event) => {
    setFacebook(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      try {
        const skillsData = await axios.get("/data/skills");
        let userData = null;

        const response = await axios.get(`/users/${authUsername}`);
        userData = response.data;

        setName(userData.name);
        setTagline(userData.tagline);
        setAbout(userData.about);
        setLinkedin(userData.socmed.linkedin);
        setGithub(userData.socmed.github);
        setTwitter(userData.socmed.twitter);
        setFacebook(userData.socmed.facebook);
        setInterests(userData.interests);
        setSelectedSkills(userData.skills);

        setCurrentUserData(userData);
        setSkills(skillsData.data);
      } catch (err) {}
    }

    getData();
  }, []);
  const handleFileInput = (event) => {};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const skills = selectedSkills;
    try {
      await axiosPrivate.put(`/users/${params.username}`, {
        name,
        tagline,
        interests,
        about,
        linkedin,
        github,
        twitter,
        facebook,
        skills,
      });
      setMessage(
        `Your profile successfully updated. You will be redirected shortly...`
      );
      setTimeout(navigate, 1500, `/users/${authUsername}`);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };
  if (!isAuth) {
    return <LoginCheck />;
  }
  console.log(currentUserData);

  return (
    <Box paddingBottom={5}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          className="contributor-form-title"
        >
          Update Profile information
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          className="contributor-form-subtitle"
        >
          {!currentUserData.name &&
            "We just need a few details, and you’ll be on your way."}
          {currentUserData.name && ""}
        </Typography>
        {message.length > 0 && (
          <Box sx={{ marginTop: "1em" }}>
            <Typography
              variant={"caption"}
              className={"contributor-form-message"}
            >
              {message}
            </Typography>
          </Box>
        )}
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Grid
          sx={{
            boxShadow: 7,
            padding: 3,
            backgroundColor: "var(--color1)",
          }}
          marginTop={4}
          container
        >
          <Grid md={4} item>
            <Box display="flex" flexDirection={"column"} alignItems={"center"}>
              <AvatarComponent
                imgUrl={previewLogo}
                sx={{
                  width: 128,
                  height: 128,
                  border: "solid 1px var(--color3)",
                  marginBottom: 2,
                }}
              />
              <Button
                variant="outlined"
                title="Upload"
                category="action"
                upload={true}
                // defaultValue={values.logo_url}
                onChange={handleFileInput}
              />
            </Box>
          </Grid>

          <Grid md={8} item>
            <Box
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className={styles["form"]}
              marginTop={5}
            >
              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                Name
              </Typography>
              <TextField
                required
                hiddenLabel
                fullWidth
                value={name}
                onChange={nameChange}
                variant="filled"
                size="small"
                type="text"
                sx={{ marginBottom: 2 }}
                // className={styles["input-text"]}
                className="input-text"
                placeholder="Filling your display name on your profile"
                autoFocus
              />

              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                Headline
              </Typography>
              <TextField
                required
                hiddenLabel
                fullWidth
                value={tagline}
                onChange={taglineChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="A Short tagline describing yourself"
              />
              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                About
              </Typography>
              <TextField
                required
                hiddenLabel
                fullWidth
                value={about}
                onChange={aboutChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="A Short tagline describing yourself"
                inputProps={{ style: { color: "var(--disable-color)" } }}
                multiline={true}
              />
              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                Interests
              </Typography>
              <TextField
                required
                hiddenLabel
                fullWidth
                value={interests}
                onChange={interestsChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Add filling your interest"
              />
              <FormControl>
                <InputLabel id="skills-multiple-chip-label">
                  Select skills
                </InputLabel>
                <Select
                  labelId="skills-multiple-chip-label"
                  id="skills-multiple-chip"
                  multiple
                  value={selectedSkills}
                  onChange={skillsSelectChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {skills.map((skill) => (
                    <MenuItem
                      key={skill}
                      value={skill}
                      style={getStyles(skill, selectedSkills, theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                Your Social Media Links
              </Typography>
              <TextField
                required
                hiddenLabel
                fullWidth
                value={linkedin || ""}
                onChange={linkedinChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Your LinkedIn link"
                InputProps={{
                  startAdornment: (
                    <LinkedInIcon
                      sx={{
                        marginY: 1,
                        color: "var(--color4)",
                        marginRight: 1,
                      }}
                      fontSize={"small"}
                    />
                  ),
                }}
              />
              <TextField
                required
                hiddenLabel
                fullWidth
                value={github || ""}
                onChange={githubChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Your Github link"
                InputProps={{
                  startAdornment: (
                    <GitHubIcon
                      sx={{
                        marginY: 1,
                        color: "var(--color4)",
                        marginRight: 1,
                      }}
                      fontSize={"small"}
                    />
                  ),
                }}
              />
              <TextField
                required
                hiddenLabel
                fullWidth
                value={facebook || ""}
                onChange={facebookChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Your Facebook link"
                InputProps={{
                  startAdornment: (
                    <FacebookIcon
                      sx={{
                        marginY: 1,
                        color: "var(--color4)",
                        marginRight: 1,
                      }}
                      fontSize={"small"}
                    />
                  ),
                }}
              />
              <TextField
                required
                hiddenLabel
                fullWidth
                value={twitter || ""}
                onChange={twitterChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Your Twitter link"
                InputProps={{
                  startAdornment: (
                    <TwitterIcon
                      sx={{
                        marginY: 1,
                        color: "var(--color4)",
                        marginRight: 1,
                      }}
                      fontSize={"small"}
                    />
                  ),
                }}
              />

              {/* SUBMIT BUTTON  */}
              <Box textAlign={"center"} alignSelf={"flex-end"}>
                {/* <Button variant="outlined" category="action" title="Cancel" /> */}
                <Button
                  variant="outlined"
                  title="Submit →"
                  category="action"
                  isFullWidth={true}
                  onClick={handleFormSubmit}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ProfileEdit;
