import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import "./ProfileConnectionFollowerPanel.css";
import UserCard from "../cards/user-card/UserCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProfileConnectionFollowerPanel(props) {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [userFollowers, setUserFollowers] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${username}/followers`)
      .then((response) => {
        setUserFollowers(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, []);
  let userFollowersCards = [];
  if (userFollowers.length) {
    userFollowersCards = userFollowers.map((user, idx) => {
      return (
        <Grid key={idx} xs={6} md={4} item>
          <UserCard user={user.follower} />
        </Grid>
      );
    });
  }
  return (
    <Grid container spacing={2} marginTop={4}>
      {userFollowersCards}
    </Grid>
  );
}

export default ProfileConnectionFollowerPanel;
