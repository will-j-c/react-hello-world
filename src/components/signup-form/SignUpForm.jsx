import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef, useState } from "react";
import "./SignUpForm.css";
import axios from "axios";

import Button from '../buttons/Button';

function LoginForm(props) {
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const handleRegistrationPost = (event) => {
    event.preventDefault();
    axios
      .post(`${props.baseUrl}/api/v1/auth/register`, {
        name: nameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        hash: passwordRef.current.value,
        confirm_password: confirmPasswordRef.current.value,
      })
      .then((response) => {
        setOpen(true);
        setMessage('PLease check your emails for the activation link');
        setSeverity('success');
        return;
      })
      .catch((error) => {
        setOpen(true);
        setMessage(error.response.data.error);
        setSeverity('error');
        return;
      });
  };
  return (
    <Box className="sign-up-form">
      <Typography
        variant="subtitle1"
        textAlign={"center"}
        id="box-title"
        gutterBottom
      >
        Sign up by
      </Typography>
      <Grid container direction="row" justifyContent={"center"}>
        <Grid item>
          <GitHubIcon sx={{ marginY: 1 }} fontSize={"large"} />
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
            Name
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue="Ex. Melody"
            variant="filled"
            size="small"
            form="registration-form"
            sx={{ marginBottom: 2 }}
            className="input-text"
            inputRef={nameRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Username
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue="Ex. McSpicy"
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
              id="sign-up-button"
              type="submit"
              category="action"
              title="Sign up"
              isFullWidth={true} 
            />
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
              title="Log in" 
              category="action"
              isFullWidth={true} 
            />
          </Box>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={((event, reason) => {
        if (reason === 'timeout') {
          setOpen(false);
        }
      })}>
        <Alert variant="filled" severity={severity} sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginForm;
