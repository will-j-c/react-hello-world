import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./MultiForm.module.scss";
import Button from "../buttons/Button";

function Confirmation(props) {
  const { values, prevStep, saveDraft, publish } = props;
  const handlePreviousClick = (event) => {
    event.preventDefault();
    prevStep();
  };
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
      <List dense={false}>
        <ListItem>
          <ListItemText
            primary="Project Title"
            secondary={values.projectTitle}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Project Tagline"
            secondary={values.projectTagline}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Project Description"
            secondary={values.projectDescription}
          />
        </ListItem>
      </List>

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
      </Box>
    </Box>
  );
}

export default Confirmation;
