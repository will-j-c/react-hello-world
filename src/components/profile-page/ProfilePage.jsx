import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import AvatarComponent from "../avatar/Avatar";

import "./ProfilePage.scss";

function ProfilePage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    axios
      .get(`${props.baseUrl}/api/v1/users/${params.username}`)
      .then((response) => {
        setProfile(response.data);
      });
  }, []);
  console.log("profile content:", profile);
  return (
    <>
      <Container>
        <Grid container>
          <Box>
            <img src={profile?.profile_pic_url} className="profileAvatar" />
          </Box>
          <Grid item className="TitlePage">
            <Typography variant="h4" component="h4" className="title-name">
              {profile?.name}
            </Typography>
            <Typography variant="h6" component="h6" className="profileAvatar">
              {profile?.tagline}
            </Typography>
            <Link to="/about">
              <img
                src="https://bobbyhadz.com/images/blog/react-usestate-dynamic-key/thumbnail.webp"
                alt="example"
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfilePage;
