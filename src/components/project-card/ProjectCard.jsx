import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../avatar/Avatar";
import OutlinedButton from "../outlined-button/OutlinedButton";
import { Link as RouterLink } from 'react-router-dom';
// import ContainedButton from "../buttons/ContainedButton";

function ProjectCard(props) {
  const categories = props.details.categories.map((category) => {
    // return <ContainedButton title={category} />;
  });
  return (
    <Card
      sx={{
        width: 1,
        height: 1,
        padding: 2,
        borderRadius: 0,
        backgroundColor: "var(--color1)",
        position: "relative",
      }}
      raised={true}
    >
      <CardActionArea component={RouterLink} to={`/projects/${props.details.slug}`}>
        <CardMedia
          component="img"
          height={150}
          image={props.details.projectImg}
          alt="green iguana"
          // sx={{ maxHeight: 1}}
        />
        <CardContent sx={{ padding: 0, marginTop: 1 }}>
          <Box display={"flex"} marginTop={2}>
            <AvatarComponent
              imgAlt={props.details.title}
              imgUrl={props.details.logo}
              sx={{ width: 24, height: 24, border: "solid 1px var(--color3)" }}
            />
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{ color: "var(--color3)", marginLeft: 1, fontWeight: 600 }}
            >
              {props.details.title}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "var(--color4)", marginY: 1 }}
          >
            {props.details.tagline}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ color: "var(--color4)", fontWeight: 500 }}
          >
            Looking for:
          </Typography>
          <Box display="flex" >{categories}</Box>
        </CardContent>
      </CardActionArea>
      <Box
        display="flex"
        padding={0}
        justifyContent={"flex-end"}
        sx={{ position: "absolute", bottom: 10, right: 5 }}
      >
        <OutlinedButton title="Follow" />
        {/* <ContainedButton title="See more" /> */}
      </Box>
    </Card>
  );
}

export default ProjectCard;
