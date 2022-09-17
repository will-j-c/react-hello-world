import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../avatar/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Button from "../buttons/Button";

function ProjectCard(props) {
  const categories = props.details.categories.map((category, idx) => {
    return (
      <Button
        category={"category"}
        title={category}
        variant={"contained"}
        key={idx}
        disabled={true}
      />
    );
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
      <CardMedia
        component="img"
        height={150}
        image={props.details.projectImg}
        alt="green iguana"
        // sx={{ maxHeight: 1}}
      />
      <CardContent sx={{ padding: 0, marginTop: 1 }}>
        <Box display={"flex"} alignItems={"center"} marginY={2}>
          <AvatarComponent
            imgAlt={props.details.title}
            imgUrl={props.details.logo}
            sx={{ width: 36, height: 36, border: "solid 1px var(--color3)" }}
          />
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ color: "var(--color3)", marginLeft: 2, fontWeight: 600 }}
          >
            {props.details.title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "var(--color4)", marginY: 2, paddingLeft: 1 }}
        >
          {props.details.tagline}
        </Typography>
        <Box display="flex" height={0.3} marginBottom={10} paddingLeft={1}>
          {categories}
        </Box>
      </CardContent>
      <Box
        display="flex"
        padding={0}
        justifyContent={"flex-end"}
        sx={{ position: "absolute", bottom: 10, right: 5 }}
      >
        <Button
          category={"action"}
          title={"Follow"}
          variant={"outlined"}
        />
        <Button
          category={"action"}
          title={"See more"}
          variant={"contained"}
          route={`/projects/${props.details.slug}`}
        />
      </Box>
    </Card>
  );
}

export default ProjectCard;
