import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from '../buttons/Button';

function FormProjectPageOne(props) {
  const { values, handleChange, nextStep } = props;
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  }
  return (
    <Box
      sx={{
        boxShadow: 7,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color1)",
      }}
      className={styles["form"]}
      marginTop={5}
    >
      <Typography variant="subtitle1" alignSelf={"flex-start"} gutterBottom>
        Project Title
      </Typography>
      <TextField
        required
        hiddenLabel
        fullWidth
        defaultValue={values.projectTitle}
        onChange={handleChange('projectTitle')}
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
        defaultValue={values.projectTagline}
        onChange={handleChange('projectTagline')}
        type="text"
        variant="filled"
        size="small"
        sx={{ marginBottom: 2 }}
        className={styles["input-text"]}
      />
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
  );
}

export default FormProjectPageOne;
