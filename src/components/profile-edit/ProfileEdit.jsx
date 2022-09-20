import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import Button from "../buttons/Button";
import styles from "./MultiForm.module.scss";
import AvatarComponent from "../avatar/Avatar";

import axios, { axiosPrivate } from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProfileEdit() {
  const params = useParams();
  const username = params.username;

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const authUsername = auth.username;
  const isAuth = authUsername === username;

  const [skills, setSkills] = useState([]);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState({});

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
    name: useRef(),
    tagline: useRef(),
    interest: useRef(),
    skills: useRef(),
    linkedin: useRef(),
    github: useRef(),
    twitter: useRef(),
    facebook: useRef(),
    profile_pic_url: useRef(),
  };

  useEffect(() => {
    async function getData() {
      try {
        const validSkillList = await axios.get(`/data/skills`);
        const userResponse = await axios.get(`/users/${username}`);
        setSkills(validSkillList.data);
        setUserData(userResponse.data);
        setFormData(userResponse.data);
        // console.log("formData is: ", formData);
        // console.log("formData name is: ", formData.name);
        console.log("userData name is: ", userData);
      } catch (error) {}
    }
    getData();
  }, [params]);

  const handleFileInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const title = formObj.titleRef.current.value;
    // const city = formObj.cityRef?.current?.value || '';
    // const description = formObj.descriptionRef.current.value;
    // const remuneration = formObj.remunerationRef?.current?.value || '';
    // const is_remote = isRemote;
    // const commitment_level = commitment;
    // const available_slots = availability;
    // const skills = selectedSkills;

    try {
      // const response = await axiosPrivate.post(
      //     `/projects/${params.slug}/contributors`,
      //     {
      //       title,
      //       is_remote,
      //       commitment_level,
      //       available_slots,
      //       remuneration,
      //       description,
      //       city,
      //       skills
      //     }
      //   )
      //   setMessage(`Contributor successfully created. You will be redirected shortly...`);
      //   setTimeout(navigate, 1500, `/contributors/${response.data._id}`);
    } catch (error) {
      // setMessage(error.response.data.error);
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
          <form>
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
              // fullWidth
              defaultValue={formData.name} //TODO: UPDATE THIS ONE LATER
              onChange={handleInputChange}
              variant="filled"
              size="small"
              type="text"
              sx={{ marginBottom: 2 }}
              className={styles["input-text"]}
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
              // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
              // onChange={handleChange("tagline")}
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
              // defaultValue="hehe" //TODO: UPDATE THIS ONE LATER
              // onChange={handleChange("tagline")}
              type="text"
              variant="filled"
              size="small"
              sx={{ marginBottom: 2 }}
              className={styles["input-text"]}
              placeholder="A Short tagline describing yourself"
              multiline
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
              // defaultValue="hehe"
              // onChange={handleChange("tagline")}
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
            {/* <Typography
              variant="subtitle1"
              alignSelf={"flex-start"}
              gutterBottom
            >
              Skills
            </Typography> */}

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
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileEdit;
