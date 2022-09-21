import { useEffect } from "react";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SearchProjectsResults(props) {
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
            Projects
          </Typography>
        </Box>
      <ProjectIndexGrid filters={{q: query}} limit={limit}/>
    </Box>  
  )
}
