import Grid from "@mui/material/Unstable_Grid2";
import SignUpForm from "../signup-form/SignUpForm";
import ProjectCard from "../project-card/ProjectCard";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";

function LoginGrid(props) {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      <Grid item md={8}>
        <ProjectIndexGrid baseUrl={props.baseUrl}/>
      </Grid>
      <Grid item md={4}>
        <SignUpForm baseUrl={props.baseUrl}/>
      </Grid>
    </Grid>
  );
}

export default LoginGrid;
