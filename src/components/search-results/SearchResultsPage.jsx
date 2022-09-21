import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
 
import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider";

export default function SearchResultsPage(props) {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  console.log(query.get('q'));

  const [ projects, setProjects ] = useState([]);
  const [ contributors, setContributors ] = useState([]);
  const [ users, setUsers ] = useState([]);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    async function getData () {
      try {
        const projectsData = await axios.get(`/projects?q=${query.get('q')}`);
        console.log(`projectsData: ${projectsData}`);
      } catch (err) {
        console.log(err)
      }
    }

    getData();
  }, [])

  return (
    <>
      <Typography
        variant="h4"
        component='h1'
        textAlign={"center"}
        marginY={4}
        sx={{ color: "var(--color3)", fontWeight: "bold" }}
      >
        Search results
      </Typography>

      <Grid container columns={{ xs: 1, md: 12 }}>
      
      </Grid>
    </>
    
  )
}
