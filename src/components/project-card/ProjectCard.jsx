import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../avatar/Avatar";
// import OutlinedButton from "../outlined-button/OutlinedButton";

function ProjectCard(props) {
  return (
    <Card sx={{ width: 1, height: 1, padding: 1, borderRadius: 0, backgroundColor: "var(--color1)" }} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={150}
          image={props.details.projectImg}
          alt="green iguana"
          // sx={{ maxHeight: 1}}
        />
        <CardContent>
          <Box display={"flex"}>
            <AvatarComponent
              imgAlt={props.details.title}
              imgUrl={props.details.logo}
              sx={{width:24, height: 24, border: "solid 1px var(--color3)"}}
            />
            <Typography gutterBottom variant="subtitle2" component="div" sx={{color: "var(--color3)", marginLeft: 2, fontWeight: 500}}>
              {props.details.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {props.details.tagline}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <OutlinedButton name="follow" /> */}
    </Card>
  );
}

export default ProjectCard;
