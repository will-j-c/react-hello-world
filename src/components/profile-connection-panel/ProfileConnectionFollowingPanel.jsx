import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import UserCard from "../cards/user-card/UserCard";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import LoginModal from "../modals/LoginModal";

function ProfileConnectionFollowingPanel() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const authUserName = auth?.username;

  const [userFollowings, setUserFollowings] = useState([]);
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
        const userFollowingsResponse = await axios.get(
          `/users/${username}/following`
        );
        setUserFollowings(
          userFollowingsResponse.data.map((relation) => relation.followee)
        );
      } catch (error) {}
    }
    getData();
  }, [params]);

  let userFollowingsCards = [];
  if (userFollowings.length) {
    userFollowingsCards = userFollowings.map((user, idx) => {
      return (
        <Grid key={idx} xs={12} sm={6} md={4} item>
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
        {userFollowingsCards}
      </Grid>
      <LoginModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  );
}

export default ProfileConnectionFollowingPanel;
