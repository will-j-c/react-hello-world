import { useEffect } from "react";
import UserIndexGrid from "../user-index-grid/UserIndexGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SearchUsersResults(props) {
  const { query, limit } = props;
  useEffect(() => {
  }, [query]);
  return (
    <Box sx={{
      backgroundColor: 'var(--color2)', 
      padding: '1em',
    }}>
        <Box>
          <Typography
            variant='h6'
            component='h3'
            color='var(--color3)'
            marginBottom='0.5em'
            fontWeight='600'
          >
            Users
          </Typography>
        </Box>
      <UserIndexGrid filters={{q: query}} limit={limit}/>
    </Box>  
  )
}
