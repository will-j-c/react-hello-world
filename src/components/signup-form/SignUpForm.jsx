import TextField from  "@mui/material/TextField";
import Box from  "@mui/material/Box";
import Grid from  "@mui/material/Grid";
import Button from "@mui/material/Button";

function LoginForm(props) {
    return (
        <Box sx={{boxShadow: 7, padding: 3}}>
            <form method="post" action="/register" id="registration-form">
                <Grid container 
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <label htmlFor="username">Username</label><br />
                        <TextField required hiddenLabel
                            id="username"
                            defaultValue="Ex. Melody"
                            variant="filled"
                            size="small"
                            form="registration-form"
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="email">Email</label><br />
                        <TextField required hiddenLabel
                            id="email"
                            defaultValue="Ex. Melody@email.com"
                            variant="filled"
                            size="small"
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="password">Password</label><br />
                        <TextField required hiddenLabel
                            id="password"
                            type="password"
                            variant="filled"
                            size="small"
                            />
                    </Grid>
                    <Grid item>
                        <label htmlFor="confirm-password">Confirm Password</label><br />
                        <TextField required hiddenLabel
                            id="confirm-password"
                            type="password"
                            variant="filled"
                            size="small"
                        />  
                    </Grid>
                    <Grid item>
                        <Button variant="outlined">Sign Up</Button>
                    </Grid>
                    <Grid item>
                        <h3>Already have an account?</h3>
                    </Grid>
                    <Grid item>
                        <Button variant="contained">Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default LoginForm