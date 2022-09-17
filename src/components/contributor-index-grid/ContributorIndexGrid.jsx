import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import axios from '../../api/axios';
import ContributorCard from '../cards/contributor-card/ContributorCard';

export default function UserIndexGrid() {
  const [contributors, setContributors] = useState([]);
  
  useEffect(() => {
    axios.get('/contributors')
    .then((response) => setContributors(response.data))
  }, [])

  const contributorCards = contributors.map((c, idx) => {
    return (
      <Grid key={idx} xs={6} md={4} item>
        <ContributorCard contributor={c} />
      </Grid>
    )
  });

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
      alignItems="stretch"
    >
      {contributorCards}
    </Grid>
  )
}
