import React from 'react';
import { useEffect, useState, useContext } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UserCard from '../cards/user-card/UserCard';
import AuthContext from '../../context/AuthProvider';
import LoginModal from '../modals/LoginModal';

export default function UserIndexGrid() {
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const username = auth?.username;

  useEffect(() => {

    async function getData() {
      try {
        const usersResponse = await axios.get('/users');
        setUsers(usersResponse.data);

        if (username) {
          const followingUsersResponse = await axiosPrivate
            .get(`/users/${username}/following`)
          setFollowingUsers(
            followingUsersResponse.data.map(
              relation => relation.followee.username
            )
          );

          const followersResponse = await axiosPrivate
            .get(`/users/${username}/followers`)
          setFollowers(
            followersResponse.data.map(
              relation => relation.follower.username
            )
          );
        }
      } catch (error) {
      }
    }

    getData();
  }, [username])

  const userCards = users.map((user, idx) => {
    if (user.username !== username) {
      return (
        <Grid key={idx} xs={6} md={4} item>
          <UserCard 
          user={user} 
          followed={followingUsers.includes(user.username)}
          triggerLogin={() => setModalIsOpen(true)}
        />
        </Grid>
      )
    }
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, md: 12 }}
        justifyContent="center"
        alignItems="stretch"
      >
        {userCards}
      </Grid>
      <LoginModal 
        isOpen={modalIsOpen} 
        onClose={() => setModalIsOpen(false)}
      />
    </>
    
  )
}
