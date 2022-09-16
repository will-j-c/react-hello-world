import Grid from "@mui/material/Unstable_Grid2";
import SignUpForm from "../signup-form/SignUpForm";
import LogInForm from "../login-form/LoginForm";
import ProjectCard from "../project-card/ProjectCard";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";

function LoginGrid(props) {
  const { baseUrl, formType } = props;
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >

      <Grid item md={8}>
        <ProjectIndexGrid baseUrl={baseUrl}/>
      </Grid>


      <Grid item md={4}>
        { formType === 'register' ? <SignUpForm baseUrl={baseUrl}/> : <LogInForm baseUrl={baseUrl}/>}
      </Grid>
    </Grid>
  );
}

export default LoginGrid;
