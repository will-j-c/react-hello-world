import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import axios from '../../api/axios';
import UserCard from '../user-card/UserCard';

export default function UserIndexGrid() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('/users')
    .then((response) => setUsers(response.data))
  }, [])

  const userCards = users.map((user, idx) => {
    return (
      <Grid key={idx} xs={6} md={4} item>
        <UserCard user={user} />
      </Grid>
    )
  });

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      {userCards}
    </Grid>
  )
}
