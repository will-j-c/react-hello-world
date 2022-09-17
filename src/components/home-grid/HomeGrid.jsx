import Grid from "@mui/material/Unstable_Grid2";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";
import TitleHomepage from '../title-homepage/TitleHomepage'

function HomeGrid(props) {
  return (
    <Grid container spacing={10} direction='column'>
      <Grid item >
        <TitleHomepage fontSize={"6.75rem"}/>
      </Grid>
      <Grid item >
        <ProjectIndexGrid baseUrl={props.baseUrl}/>
      </Grid>
    </Grid>
  );
}

export default HomeGrid;
