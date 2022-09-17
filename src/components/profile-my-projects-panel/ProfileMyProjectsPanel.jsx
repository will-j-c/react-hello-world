import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProfileMyProjectsPanel.css";

function ProfileMyProjectsPanel(props) {
  if (props.profile) {
    const { skills, interests } = props.profile;

    const skillsToDisplay = skills.length ? (
      skills.map((skill, idx) => {
        return (
          <Box
            key={idx}
            sx={{ backgroundColor: "var(--color7a)" }}
            padding={1}
            marginRight={1}
            borderRadius={1}
          >
            {skill}
          </Box>
        );
      })
    ) : (
      <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
        Nothing here yet!
      </Typography>
    );
    return (
      <Box marginTop={2}>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          About me:
        </Typography>
        <Box sx={{ backgroundColor: "var(--color1)" }} padding={2}>
          <Typography sx={{ color: "var(--color4)" }} variant={"body2"}>
            {"about_me about_meabout_meabout_meabout_me" || "Nothing here yet!"}
          </Typography>
        </Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Categories:
        </Typography>
        <Box display={"flex"}>{skillsToDisplay}</Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Images:
        </Typography>
        {/* <Box display="flex">{images}</Box> */}
      </Box>
    );
  }
}

export default ProfileMyProjectsPanel;
