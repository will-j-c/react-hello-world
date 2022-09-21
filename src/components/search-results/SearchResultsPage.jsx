import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
 
import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider";
import SearchProjectsResults from "./SearchProjectsResults";

export default function SearchResultsPage(props) {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const keyword = query.get('q');
  const [q, setQ] = useState([]);

  const [ projects, setProjects ] = useState([]);
  const [ contributors, setContributors ] = useState([]);
  const [ users, setUsers ] = useState([]);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setQ([keyword]);
  }, [keyword])

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

      <Grid container direction='column'>
        <Grid item>
          <SearchProjectsResults query={q} props2={'hello'}/>
        </Grid>
      </Grid>
    </>
    
  )
}
