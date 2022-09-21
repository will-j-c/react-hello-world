import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../../avatar/Avatar";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Button from "../../buttons/Button";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import AuthContext from "../../../context/AuthProvider";

import "../Card.scss";

function ProjectCard(props) {
  const { projectImg, title, tagline, logo, categories, slug, projectOwner, state } = props.project;
  const categoriesDisplay = categories
    .map((category, idx) => {
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

  const [buttonTitle, setButtonTitle] = useState("Following");
  const [followStatus, setFollowStatus] = useState(props.followed);
  const { auth } = useContext(AuthContext);
  const username = auth?.username;

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setFollowStatus(props.followed);
  }, [props.followed]);

  useEffect(() => {}, [followStatus]);

  const handleMouseOver = function () {
    setButtonTitle("Unfollow");
  };

  const handleMouseLeave = function () {
    setButtonTitle("Following");
  };

  const handleFollowAction = async function () {
    try {
      if (!username) {
        props.triggerLogin();
        return;
      }

      if (followStatus) {
        await axiosPrivate.delete(`/projects/${slug}/unfollow/${username}`);
        setFollowStatus(false);
      } else {
        await axiosPrivate.post(`/projects/${slug}/follow/${username}`);
        setFollowStatus(true);
      }
      return;
    } catch (err) {}
  };

  const triggerDeleteModal = () => {
    props.triggerDeleteModal({slug, title});
  }

  return (
    <Card raised={true}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={150}
          image={projectImg}
          alt={title}
        />
        { state !== 'published' && (
          <Box className='image-overlay'>
            <Typography variant='body2' color='var(--disable-color)' fontStyle='italic'>
              {state}
            </Typography>
          </Box>
        )}
      </Box>
      
      <CardContent>
        <Box display={"flex"} alignItems={"center"} marginY={2}>
          <AvatarComponent
            imgAlt={title}
            imgUrl={logo}
            sx={{ width: 36, height: 36, border: "solid 1px var(--color3)" }}
          />
          <Typography
            className="card-title"
            variant="h6"
            sx={{ marginLeft: 1 }}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" className="card-tagline" sx={{height: '3em'}}>
          {tagline?.length > 85 ? tagline.slice(0, 83) + '...' : tagline}
        </Typography>
        <Box className='card-categories' sx={{maxHeight: '5em'}}>
          {categoriesDisplay}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          category={"action"}
          title={"View"}
          variant={"outlined"}
          route={`/projects/${slug}`}
        />
        { username !== projectOwner && 
          (
            <Button
              category={"action"}
              title={followStatus ? `${buttonTitle}` : "Follow"}
              variant={followStatus ? "outlined" : "contained"}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={handleFollowAction}
            />
          )
        }
        { username === projectOwner &&
          (<>
            <Button
              category={"action"}
              title={"Delete"}
              variant={"outlined"}
              onClick={triggerDeleteModal}
            />
          </>) 
        }
      </CardActions>
      
    </Card>
  );
}

export default ProjectCard;
