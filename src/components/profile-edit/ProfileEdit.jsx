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
import { categories } from "./categories";

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

  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  //TODO: chnge input value box wider
  const {
    // values, //TODO: check defaut logo value
    // handleChange,
    nextStep,
    // handleFileInput,
    // previewLogo,
    checkBoxTrack,
    // checkedState,
  } = props;
  // console.log(previewLogo);
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  };

  const onCheck = (event) => {
    checkBoxTrack({ [event.target.value]: event.target.checked });
  };

  const handleFileInput = (event) => {};
  const handleChange = (input) => (event) => {};
  // const values = {
  //   username,
  //   title,
  //   tagline,
  //   categories,
  //   logo_url,
  //   state,
  //   description,
  //   image_urls,
  // };
  // const {
  //   step,
  //   username,
  //   title,
  //   tagline,
  //   categories,
  //   logo_url,
  //   state,
  //   description,
  //   image_urls,
  // } = form;

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
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
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
            autoFocus="true"
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

          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            {categories.map((category) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={category}
                      onChange={handleChange("categories")}
                      onClick={onCheck}
                      checked={checkedState[category] || false}
                    />
                  }
                  key={category}
                  label={category}
                />
              );
            })}
          </FormGroup>
          <Box textAlign={"center"} alignSelf={"flex-end"}>
            <Button
              variant="outlined"
              title="Next"
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
