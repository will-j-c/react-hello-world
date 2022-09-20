import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from "../buttons/Button";
import Grid from "@mui/material/Unstable_Grid2";
import AvatarComponent from "../avatar/Avatar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { categories } from "./categories";

function FormProjectPageOne(props) {
  const {
    values,
    handleChange,
    nextStep,
    handleFileInput,
    previewLogo,
    checkBoxTrack,
    checkedState,
  } = props;
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  };
  const onCheck = (event) => {
    checkBoxTrack({ [event.target.value]: event.target.checked });
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
      <Grid md={4} justifyContent={"center"} item>
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AvatarComponent
            imgUrl={previewLogo}
            sx={{
              width: 256,
              height: 256,
              border: "solid 1px var(--color3)",
              marginBottom: 4,
            }}
          />
          <Button
            variant="outlined"
            title="Upload"
            category="action"
            upload={true}
            defaultValue={values.logo_url}
            onChange={handleFileInput("logo_url_files")}
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
        >
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Project Title
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue={values.title}
            onChange={handleChange("title")}
            variant="filled"
            size="small"
            type="text"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
          />
          <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
            Project Tagline
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue={values.tagline}
            onChange={handleChange("tagline")}
            type="text"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
          />
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            {categories.map((category) => {
              console.log(checkedState[category])
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

export default FormProjectPageOne;
