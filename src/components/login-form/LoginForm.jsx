import React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef, useState } from "react";
import './LoginForm.scss'
import axios from "axios";

import Button from '../buttons/Button';

export default function LogInForm(props) {

  const { baseUrl } = props;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  return (
    <Box className="login-form">
      <Typography
        variant="subtitle1"
        textAlign={"center"}
        id="box-title"
        gutterBottom
      >
        Log in by
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
        <form>
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
            // inputRef={passwordRef}
          />
          <Box textAlign={"center"}>
            <Button
              variant="contained"
              title="Log in" 
              category="action"
              isFullWidth={true} 
            />
          </Box>
        </form>
        <Box textAlign={"center"} mt={2} mb={2}>
          <Typography
            variant="subtitle1"
            align={"center"}
            display={"inline"}
            paddingX={1}
            gutterBottom
          >
            Don't have an account?
            
          </Typography>
          
          <Link className={'link'} to='/register'>
            <Typography>Sign up</Typography>
          </Link>
          
        </Box>
        
      </Box>

    </Box>
  )
}
