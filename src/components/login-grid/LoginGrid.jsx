import Grid from "@mui/material/Unstable_Grid2";
import SignUpForm from "../signup-form/SignUpForm";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";

function LoginGrid(props) {
  return (
    <Grid
      container
      spacing={4}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      <Grid item md={8} sx={{display: {xs: "none", sm: "block"}}}>
        <ProjectIndexGrid baseUrl={props.baseUrl}/>
      </Grid>
      <Grid item md={4}>
        <SignUpForm baseUrl={props.baseUrl}/>
      </Grid>
    </Grid>
  );
}

export default LoginGrid;
