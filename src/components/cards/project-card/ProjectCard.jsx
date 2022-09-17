import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../../avatar/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Button from "../../buttons/Button";

import '../Card.scss';

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
    <Card raised={true}>
      <CardMedia
        component="img"
        height={150}
        image={props.details.projectImg}
        alt="green iguana"
        // sx={{ maxHeight: 1}}
      />
      <CardContent>
        <Box display={"flex"} alignItems={"center"} marginY={2}>
          <AvatarComponent
            imgAlt={props.details.title}
            imgUrl={props.details.logo}
            sx={{ width: 36, height: 36, border: "solid 1px var(--color3)" }}
          />
          <Typography className='card-title' variant='h6' sx={{marginLeft: 1}}>
            {props.details.title}
          </Typography>
        </Box>
        <Typography variant='body2' className='card-tagline'>
          {props.details.tagline}
        </Typography>
        <Box display="flex" height={0.3} marginBottom={10} marginTop={1}>
          {categories}
        </Box>
      </CardContent>
      <CardActions>
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
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
