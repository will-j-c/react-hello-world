import Grid from "@mui/material/Unstable_Grid2";

import { useState, useEffect } from 'react';

import UserCard from "../../cards/user-card/UserCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axios from '../../../api/axios';

export default function ContributorApplicantsPanel(props) {
  const applicants = props.relations;
  const [ users, setUsers ] = useState([]);

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
      } catch (error) {}
    }

    getUsersData();
  }, [])

  const userCards = users.map((user, idx) => {
    return (
      <Grid key={idx} xs={12} md={6} item>
        <UserCard
          user={user}
          followed={null}
          triggerLogin={null}
          isContributorPage={true}
        />
      </Grid>
    );
  })

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
    </>
  )
}
