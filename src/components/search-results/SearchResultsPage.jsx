import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from '../buttons/Button';

import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
 
import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider";
import SearchProjectsResults from "./SearchProjectsResults";
import SearchUsersResults from './SearchUsersResults';
import SearchContributorsResults from "./SearchContributorsResults";

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
        sx={{ color: "var(--color3)", fontWeight: "bold" }}
      >
        Search results
      </Typography>
      <Typography
        variant="h6"
        component='h2'
        textAlign={"center"}
        sx={{ color: "var(--color3)"}}
      >
        for "<span className='highlight-text'>{keyword}</span>"
      </Typography>

      <Box padding='2em 0' display='flex' gap='0.3em'>
        <Button 
          category='category'
          title='All'
          variant='contained'
        />
        <Button 
          category='category'
          title='Projects'
          variant='outlined'
        />
        <Button 
          category='category'
          title='Users'
          variant='outlined'
        />
        <Button 
          category='category'
          title='Contributors'
          variant='outlined'
        />
      </Box>

      <Grid container direction='column' rowSpacing={1.1}>
        <Grid item>
          <SearchProjectsResults query={q} />
        </Grid>
        <Grid item>
          <SearchUsersResults query={q} />
        </Grid>
        <Grid item>
          <SearchContributorsResults query={q} />
        </Grid>
      </Grid>
    </>
    
  )
}
