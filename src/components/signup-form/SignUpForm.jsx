import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./SignUpForm.css";

const styles = theme => ({
  multilineColor:{
      defaultValue:'red'
  }
});

function LoginForm(props) {
  return (
    <Box
      sx={{
        boxShadow: 7,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color1)"
      }}
    >
      <form method="post" action="/register" id="registration-form">
        <Typography variant="subtitle1" gutterBottom>
          Username
        </Typography>
        <TextField
          required
          hiddenLabel
          fullWidth
          id="username"
          defaultValue="Ex. Melody"
          variant="filled"
          size="small"
          form="registration-form"
          sx={{ marginBottom: 2 }}
          className="input-text"
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
        />
        <Box textAlign={"center"}>
          <Button variant="outlined" size="small" id="sign-up-button" fullWidth>
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
          <Button variant="contained" size="small" fullWidth id="login-button">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
