import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import "./SignUpForm.css";
import axios from "axios";

function LoginForm(props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleRegistrationPost = (event) => {
    console.log(props);
    event.preventDefault();
    axios
      .post(`${props.baseUrl}/register`, {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        hash: passwordRef.current.value,
        confirm_password: confirmPasswordRef.current.value,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box className="sign-up-form">
      <Typography variant="subtitle1" textAlign={"center"} id="box-title" gutterBottom>
        Sign up by
      </Typography>
      <Grid container direction="row" justifyContent={"center"}>
        <Grid item>
          <GitHubIcon sx={{marginY: 1}} fontSize={"large"}/>
        </Grid>
      </Grid>
      
      <Typography variant="subtitle1" id="or" gutterBottom>
        <span>or</span>
      </Typography>
      <Box
        sx={{
          boxShadow: 7,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color1)",
        }}
      >
        <form id="registration-form" onSubmit={handleRegistrationPost}>
          <Typography variant="subtitle1" gutterBottom>
            Username
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            name="username"
            defaultValue="Ex. Melody"
            variant="filled"
            size="small"
            form="registration-form"
            sx={{ marginBottom: 2 }}
            className="input-text"
            inputRef={usernameRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="email"
            defaultValue="Ex. Melody@email.com"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className="input-text"
            inputRef={emailRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Password
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="password"
            type="password"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className="input-text"
            inputRef={passwordRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Confirm Password
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="confirm-password"
            type="password"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className="input-text"
            inputRef={confirmPasswordRef}
          />
          <Box textAlign={"center"}>
            <Button
              variant="outlined"
              size="small"
              id="sign-up-button"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
          </Box>
          <Box textAlign={"center"} mt={2} mb={2}>
            <Typography
              variant="subtitle1"
              align={"center"}
              display={"inline"}
              paddingX={1}
              gutterBottom
            >
              Already have an account?
            </Typography>
          </Box>
          <Box textAlign={"center"}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              id="login-button"
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
