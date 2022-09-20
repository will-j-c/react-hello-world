import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Button from "../buttons/Button";
import styles from "./MultiForm.module.scss";
import AvatarComponent from "../avatar/Avatar";
// import { getValidSkills } from "./ValidSkills";

import axios, { axiosPrivate } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProfileEdit(props) {
  const params = useParams();
  const username = params.username;

  const location = useLocation();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;
  const isAuth = profileOwnerName === username;

  const [skills, setSkills] = useState([]);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [checkedSkills, setCheckedSkills] = useState([]);
  const [checkedState, setCheckedState] = useState({});

  const [form, setForm] = useState({
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
  useEffect(() => {
    async function getSkill() {
      try {
        const validSkillList = await axios.get(`/data/skills`);
        const data = validSkillList.data;
        setSkills(data);
      } catch (error) {}
    }
    getSkill();
  }, []);

  //TODO: chnge input value box wider
  const {
    // values, //TODO: check defaut logo value
    // handleChange,
    nextStep,
    // handleFileInput,
    // previewLogo,
    // checkBoxTrack,
    // checkedState,
  } = props;
  // console.log(previewLogo);
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  };
  const checkBoxTrack = (checkedBoxes) => {
    setCheckedState((prevState) => ({
      ...prevState,
      ...checkedBoxes,
    }));
  };

  const onCheck = (event) => {
    checkBoxTrack({ [event.target.value]: event.target.checked });
  };

  const handleFileInput = (event) => {};
  const handleChange = (input) => (event) => {
    if (input === "skills") {
      // console.log("event.target.value :", event.target.value);
      if (event.target.checked) {
        setCheckedSkills((prevState) => [...prevState, event.target.value]);
        setForm((prevState) => ({
          ...prevState,
          [input]: checkedSkills, //BUG: can not get the latest clicke into
        }));
        // console.log("checkedSkills :", checkedSkills);
      } else {
        // console.log("checkedSkills :", checkedSkills);
        setCheckedSkills(
          checkedSkills.filter((value) => {
            return value !== event.target.value;
          })
        );
        setForm((prevState) => ({
          ...prevState,
          [input]: checkedSkills,
        }));
      }
    } else {
      setForm((prevState) => ({
        ...prevState,
        [input]: event.target.value,
      }));
    }
  };

  return (
    <Grid
      sx={{
        boxShadow: 7,
        padding: 3,
        backgroundColor: "var(--color1)",
      }}
      marginTop={4}
      columns={{ xs: 1, md: 12 }}
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
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            {skills.map((skill) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={skill}
                      onChange={handleChange("skills")}
                      onClick={onCheck}
                      checked={checkedState[skill] || false}
                    />
                  }
                  key={skill}
                  label={skill}
                />
              );
            })}
          </FormGroup>
          {/* <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Name
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
            onChange={handleChange("title")}
            variant="filled"
            size="small"
            type="text"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            placeholder="Filling your display name on your profile"
            // autoFocus="true"
          />
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Headline
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
            onChange={handleChange("tagline")}
            type="text"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            placeholder="A Short tagline describing yourself"
          />
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            About
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
            onChange={handleChange("tagline")}
            type="text"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            placeholder="A Short tagline describing yourself"
            multiline="true"
          />
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Interests
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
            onChange={handleChange("tagline")}
            type="text"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            placeholder="Add filling your interest"
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
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Skills
          </Typography> */}

          <Box textAlign={"center"} alignSelf={"flex-end"}>
            <Button
              variant="outlined"
              title="Submit →"
              category="action"
              isFullWidth={true}
              onClick={handleContinueClick}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileEdit;
