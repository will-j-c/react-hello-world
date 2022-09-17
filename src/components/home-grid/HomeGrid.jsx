import Grid from "@mui/material/Unstable_Grid2";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import TitleHomepage from '../title-homepage/TitleHomepage'
import useMediaQuery from '@mui/material/useMediaQuery';

function HomeGrid(props) {
  const matches = useMediaQuery('(max-width:400px)');
  console.log(matches)
  return (
    <Grid container spacing={10} direction='column'>
      <Grid item >
        <TitleHomepage fontSize={matches ? "3.5rem" : "6.75rem"}/>
      </Grid>
      <Grid item >
        <ProjectIndexGrid baseUrl={props.baseUrl}/>
      </Grid>
    </Grid>
  );
}

export default HomeGrid;
