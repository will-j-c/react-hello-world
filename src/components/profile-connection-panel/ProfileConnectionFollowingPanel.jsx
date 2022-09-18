import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import UserCard from "../cards/user-card/UserCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProfileConnectionFollowingPanel() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const profileOwnerName = auth.username;

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [userFollowings, setUserFollowings] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${username}/following`)
      .then((response) => {
        setUserFollowings(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, [params]);
  let userFollowingsCards = [];
  if (userFollowings.length) {
    userFollowingsCards = userFollowings.map((user, idx) => {
      return (
        <Grid key={idx} xs={6} md={4} item>
          <UserCard user={user.followee} />
        </Grid>
      );
    });
  }
  return (
    <Grid container spacing={2} marginTop={4}>
      {userFollowingsCards}
    </Grid>
  );
}

export default ProfileConnectionFollowingPanel;
