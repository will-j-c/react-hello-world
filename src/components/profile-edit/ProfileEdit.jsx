import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";

import Button from "../buttons/Button";
import styles from "./MultiForm.module.scss";
import AvatarComponent from "../avatar/Avatar";

import axios, { axiosPrivate } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProfileEdit() {
  const theme = useTheme();
  const params = useParams();
  const username = params.username;

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const authUsername = auth.username;
  const isAuth = authUsername === username;

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

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

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    interest: [],
    skills: [],
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    profile_pic_url: "",
  });
  const formObj = {
    nameRef: useRef(),
    taglineRef: useRef(),
    interestRef: useRef(),
    linkedinRef: useRef(),
    githubRef: useRef(),
    twitterRef: useRef(),
    facebookRef: useRef(),
  };

  useEffect(() => {
    async function getData() {
      try {
        const validSkillList = await axios.get(`/data/skills`);
        const userResponse = await axios.get(`/users/${username}`);
        setSkills(validSkillList.data);
        setUserData(userResponse.data);
        // console.log("userData is: ", userData);
      } catch (error) {}
    }
    getData();
  }, [params]);

  const handleFileInput = (event) => {};
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // console.log("formObj.taglineRef is: ", formObj.interestRef);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const name = formObj.nameRef.current.value;
    const tagline = formObj.taglineRef.current.value;
    const interest = formObj.interestRef.current.value;
    // const linkedin = formObj.linkedinRef.current.value;
    // const github = formObj.githubRef.current.value;
    // const twitter = formObj.twitterRef.current.value;
    // const facebook = formObj.facebookRef.current.value;

    const skills = selectedSkills;

    try {
      const response = await axiosPrivate.put(`/users/${params.username}`, {
        name,
        tagline,
        interest,
        // linkedin,
        // github,
        // twitter,
        // facebook,
        skills,
      });
      console.log("success");
      // navigate(`users/${authUsername}`);
      setMessage(
        `Your profile successfully updated. You will be redirected shortly...`
      );
      setTimeout(navigate, 1500, `/users/${authUsername}`);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Box>
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
          We just need a few details, and you’ll be on your way.
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
                defaultValue={userData.name}
                onChange={handleInputChange}
                variant="filled"
                size="small"
                type="text"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                // className="input-text"
                placeholder="Filling your display name on your profile"
                autoFocus
                inputRef={formObj.nameRef}
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
                defaultValue={userData.tagline}
                onChange={handleInputChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="A Short tagline describing yourself"
                inputRef={formObj.taglineRef}
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
                defaultValue={userData.about}
                onChange={handleInputChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="A Short tagline describing yourself"
                multiline
                inputRef={formObj.aboutRef}
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
                defaultValue={userData.interest}
                onChange={handleInputChange}
                type="text"
                variant="filled"
                size="small"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
                placeholder="Add filling your interest"
                inputRef={formObj.interestRef}
              />
              <Box
                display="flex"
                height={0.3}
                marginBottom={10}
                marginTop={1}
                alignSelf="flex-start"
              >
                haha hhooa Interest sadada
              </Box>
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
