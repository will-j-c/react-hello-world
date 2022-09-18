import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from '../buttons/Button';

function FormProjectPageTwo(props) {
  const { values, handleChange, nextStep, prevStep } = props;
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  }
  const handlePreviousClick = (event) => {
    event.preventDefault();
    prevStep();
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
      Project Description
    </Typography>
    <TextField
      required
      hiddenLabel
      fullWidth
      defaultValue={values.description}
      onChange={handleChange('description')}
      variant="filled"
      size="small"
      type="text"
      sx={{ marginBottom: 2 }}
      className={styles["input-text"]}
    />
    <Box textAlign={"center"} alignSelf={"flex-end"} display={"flex"}>
    <Button
        variant="outlined"
        title="Previous"
        category="action"
        isFullWidth={true}
        onClick={handlePreviousClick}
      />
      <Button
        variant="outlined"
        title="Next"
        category="action"
        isFullWidth={true}
        onClick={handleContinueClick}
      />
    </Box>
  </Box>
  )
}

export default FormProjectPageTwo