import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import UserCard from "../cards/user-card/UserCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import LoginModal from "../modals/LoginModal";

function ProfileConnectionFollowerPanel() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const authUserName = auth?.username;

  const [userFollowers, setUserFollowers] = useState([]);
  const [authUserFollowings, setAuthUserFollowings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        if (authUserName) {
          const authUserFollowingResponse = await axios.get(
            `/users/${authUserName}/following`
          );
          setAuthUserFollowings(
            authUserFollowingResponse.data.map(
              (relation) => relation.followee.username
            )
          );
        }
        const userFollewersResponse = await axios.get(
          `/users/${username}/followers`
        );
        setUserFollowers(
          userFollewersResponse.data.map((relation) => relation.follower)
        );
      } catch (error) {}
    }
    getData();
  }, [params]);

  let userFollowersCards = [];
  if (userFollowers.length) {
    userFollowersCards = userFollowers.map((user, idx) => {
      return (
        <Grid key={idx} xs={6} md={4} item>
          <UserCard
            user={user}
            followed={authUserFollowings.includes(user.username)}
            triggerLogin={() => setModalIsOpen(true)}
          />
        </Grid>
      );
    });
  }
  return (
    <>
      <Grid container spacing={2} marginTop={4}>
        {userFollowersCards}
      </Grid>
      <LoginModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  );
}

export default ProfileConnectionFollowerPanel;
