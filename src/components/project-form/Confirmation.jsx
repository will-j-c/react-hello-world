import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from "../buttons/Button";
import AvatarComponent from "../avatar/Avatar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Confirmation(props) {
  const {
    values,
    prevStep,
    saveDraft,
    publish,
    previewLogo,
    previewProjectImages,
    open,
    severity,
    message,
    setOpen
  } = props;
  const handlePreviousClick = (event) => {
    event.preventDefault();
    prevStep();
  };
  return (
    <Grid
      className={styles["form"]}
      sx={{
        boxShadow: 7,
        padding: 3,
        backgroundColor: "var(--color1)",
      }}
      flexDirection={"column"}
      gap={6}
      container
    >
      <Grid item>
        <Grid gap={5} justifyContent={"center"} alignItems={"center"} container>
          <Grid item>
            <AvatarComponent
              imgUrl={previewLogo}
              sx={{
                width: 256,
                height: 256,
                border: "solid 1px var(--color3)",
                marginBottom: 2,
              }}
            />
          </Grid>
          <Grid md={6} item>
            <Box className={styles["form"]}>
              <List dense={false}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant={"h5"}
                        children={"Project title"}
                        marginBottom={2}
                      />
                    }
                    secondary={
                      <Typography
                        variant={"body1"}
                        children={values.title || "A title is required!"}
                        backgroundColor={"var(--color2)"}
                        padding={1}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant={"h5"}
                        children={"Project tagline"}
                        marginBottom={2}
                      />
                    }
                    secondary={
                      <Typography
                        variant={"body1"}
                        children={values.tagline || "There's nothing here!"}
                        backgroundColor={"var(--color2)"}
                        padding={1}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        variant={"h5"}
                        children={"Project description"}
                        marginBottom={2}
                      />
                    }
                    secondary={
                      <Typography
                        variant={"body1"}
                        children={values.description || "There's nothing here!"}
                        backgroundColor={"var(--color2)"}
                        padding={1}
                      />
                    }
                  />
                </ListItem>
              </List>
              {values.categories.map((category) => {
                return (
                  <Button
                    variant="contained"
                    title={category}
                    category="category"
                    onClick={handlePreviousClick}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item>
            <ImageList
              cols={
                previewProjectImages.length > 3
                  ? 3
                  : previewProjectImages.length
              }
            >
              {previewProjectImages.map((item, idx) => (
                <ImageListItem key={idx} sx={{ width: 75, height: 75 }}>
                  <img src={item} alt={item} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Grid>
      <Grid item textAlign={"center"} alignSelf={"flex-end"} display={"flex"}>
        <Button
          variant="outlined"
          title="Previous"
          category="action"
          isFullWidth={true}
          onClick={handlePreviousClick}
        />
        <Button
          variant="outlined"
          title="Save as Draft"
          category="action"
          isFullWidth={true}
          onClick={saveDraft}
          className={styles["no-wrap"]}
        />
        <Button
          variant="contained"
          title="Publish"
          category="action"
          isFullWidth={true}
          onClick={publish}
        />
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
    </Grid>
  );
}

export default Confirmation;
