import Box from "@mui/material/Box";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import TitleHomepage from '../title-homepage/TitleHomepage';
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';

import Button from '../buttons/Button'

function HomeGrid(props) {
  const matches = useMediaQuery('(max-width:400px)');
  return (
    <Box>
        <TitleHomepage fontSize={matches ? "3rem" : "6.75rem"}/>
        <Box textAlign="center" padding="2em">
          <Typography variant="subtitle1" component="h2" color="var(--color4)">
          Where like minded people can come together to make amazing things happen. It's Linkedin for developers!
          </Typography>
        </Box>
        <Box textAlign="center" padding="2em">
          <Typography variant="subtitle1" component="h3" color="var(--color3)" fontWeight="bold" marginBottom="1em">
            Latest projects from our community
          </Typography>
          <Button 
            category="action"
            title="View All"
            variant="contained"
            route={"/projects"}
          />
        </Box>
        <Box>
          <ProjectIndexGrid limit={3}/>
        </Box>
        
    </Box>
  );
}

export default HomeGrid;
