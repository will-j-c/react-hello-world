import Grid from "@mui/material/Unstable_Grid2";
import SignUpForm from "../signup-form/SignUpForm";

function LoginGrid(props) {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
    >
      <Grid item md={8}>
        {/* Some stuff will go here    */}
      </Grid>
      <Grid item md={4}>
        <SignUpForm baseUrl={props.baseUrl}/>
      </Grid>
    </Grid>
  );
}

export default LoginGrid;
