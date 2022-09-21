import { useEffect } from "react";
import ContributorIndexGrid from '../contributor-index-grid/ContributorIndexGrid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SearchContributorsResults(props) {
  const { query  } = props;
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
            Contributors
          </Typography>
        </Box>
      <ContributorIndexGrid filters={{q: query}} limit={3}/>
    </Box>  
  )
}
