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
              {profile?.tagline || "nothing"}
            </Typography>
            <Link to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="github-logo"
                className="socmed-logo"
              />
            </Link>
          </Grid>
        </Grid>
        <>
          <Box display={"flex"}>
            <AvatarComponent
              imgAlt="haha"
              imgUrl="https://i.pinimg.com/564x/8b/ee/af/8beeafe15422ea45639a5565f69576bd.jpg"
              sx={{
                width: 300,
                height: 300,
                border: "solid 1px var(--color3)",
              }}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              marginLeft={5}
            >
              <Typography sx={{ color: "var(--color3)" }}>"haha"</Typography>
              <Typography sx={{ color: "var(--color4)" }}>"tagline"</Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={8}
            columns={{ xs: 1, md: 12 }}
            justifyContent="space-between"
            marginTop={4}
          >
            <Grid md={8} alignSelf={"flex-start"} item>
              <Box
                sx={{
                  border: "solid 1px var(--color3)",
                  backgroundColor: "var(--color2)",
                }}
                paddingX={4}
                paddingBottom={4}
                id="panel-box"
              >
                "haha"
              </Box>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </>
      </Container>
    </>
  );
}

export default ProfilePage;
