import Grid from  "@mui/material/Grid";
import SignUpForm from "../signup-form/SignUpForm";

function LoginGrid(props) {
    return (
        <Grid container 
            spacing={2}
        >
            <Grid item xs={8}>
             {/* Some stuff will go here    */}
            </Grid>
            <Grid item xs={4}>
                <SignUpForm />
            </Grid>
        </Grid>
    );
}

export default LoginGrid;