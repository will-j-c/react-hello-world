import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from "../buttons/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function FormProjectPageTwo(props) {
  const {
    values,
    handleChange,
    nextStep,
    prevStep,
    handleFileInput,
    previewProjectImages,
    open,
    severity,
    message,
    setOpen,
    handleDeleteImageFromUpload
  } = props;
  const handleContinueClick = (event) => {
    event.preventDefault();
    nextStep();
  };
  const handlePreviousClick = (event) => {
    event.preventDefault();
    prevStep();
  };
  return (
    <>
      <Box
        sx={{
          boxShadow: 7,
          padding: 3,
          backgroundColor: "var(--color1)",
        }}
        className={styles["form"]}
        marginTop={5}
      >
        <Grid
          columns={{ xs: 1, md: 12 }}
          gap={4}
          justifyContent={"center"}
          container
        >
          <Grid md={8} item>
            <Box>
              <Typography
                variant="subtitle1"
                alignSelf={"flex-start"}
                gutterBottom
              >
                Project Description
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                multiline
                minRows={15}
                defaultValue={values.description}
                onChange={handleChange("description")}
                variant="filled"
                size="small"
                type="text"
                sx={{ marginBottom: 2 }}
                className={styles["input-text"]}
              />
            </Box>
          </Grid>
          <Grid md={3} textAlign={"center"} item>
            <Typography
              variant="subtitle1"
              alignSelf={"flex-start"}
              marginBottom={2}
              gutterBottom
            >
              Upload project images
            </Typography>
            <Button
              variant="outlined"
              title="Upload"
              category="action"
              upload={true}
              defaultValue={values.image_urls}
              onChange={handleFileInput("image_urls_files")}
              single={false}
            />
            <ImageList
              cols={
                previewProjectImages.length < 2
                  ? previewProjectImages.length
                  : 2
              }
              sx={{ marginBottom: 3 }}
            >
              {previewProjectImages.map((item) => (
                <ImageListItem key={item} sx={{ marginTop: 3 }}>
                  <img src={item} alt={item} loading="lazy" />
                  <HighlightOffOutlinedIcon
                    sx={{ marginTop: 1, 
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    htmlColor={"var(--color3)"}
                    onClick={handleDeleteImageFromUpload}
                    id={item}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>

        <Box textAlign={"right"}>
          <Button
            variant="outlined"
            title="Previous"
            category="action"
            onClick={handlePreviousClick}
          />
          <Button
            variant="outlined"
            title="Next"
            category="action"
            onClick={handleContinueClick}
          />
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            setOpen(false);
          }
        }}
      >
        <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FormProjectPageTwo;
