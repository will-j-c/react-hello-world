import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from 'react';

import UserCard from "../../cards/user-card/UserCard";
import axios from '../../../api/axios';

export default function ContributorApplicantsPanel(props) {
  const { applicants, noOfAcceptance, availableSlots } = props;
  
  const [ users, setUsers ] = useState([]);
  const [ availability, setAvailability ] = useState(0);

  useEffect(() => {
    async function getUsersData() {
      try {
        let usersData = [];
        for await (const applicant of applicants) {
          const response = await axios
            .get(`/users/${applicant.user_id.username}`);
          usersData.push(response.data);
        }
        setUsers(usersData);
        setAvailability(Math.max(availableSlots - noOfAcceptance, 0));
      } catch (error) {}
    }

    getUsersData();
  }, [])

  const updateAcceptance = () => {
    setAvailability(prev => prev - 1);
    props.updateAcceptance();
  }
  const userCards = users.map((user, idx) => {
    const username = user.username;
    const application = applicants.filter(a => a.user_id.username === username);
    let status = 'not applied';
    if (application) { status = application[0].state };
    return (
      <Grid key={idx} xs={12} md={6} item>
        <UserCard
          user={user}
          followed={null}
          triggerLogin={null}
          isContributorPage={true}
          applicationStatus={status}
          availability={availability}
          updateAcceptance={updateAcceptance}
        />
      </Grid>
    );
  })

  return (
    <>
      <Box
        sx={{
          color:'var(--color3)',
          padding: '0.5em',
          marginTop: '0.8em',
          textAlign: 'center'
        }}
      >
        <Typography variant='body2'>
        {availability} slots available ({noOfAcceptance} out of {availableSlots} filled)
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, md: 12 }}
        justifyContent="center"
        alignItems="stretch"
      >
        {userCards}
      </Grid>
    </>
  )
}
