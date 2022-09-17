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
      <Container sx={{ width: 900 }}>
        <Grid container>
          <Grid item xs={3}>
            <Box>
              <img
                src={profile?.profile_pic_url}
                width="100"
                className="profileAvatar"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" component="h3" color="text.secondary">
              Explore the world
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfilePage;
