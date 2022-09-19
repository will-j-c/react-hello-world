import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextField from "@mui/material/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
 
import './Modal.scss';

import AuthContext from '../../context/AuthProvider';
import Button from '../buttons/Button';
import axios from '../../api/axios';

export default function LoginModal(props) {
  const [ errorMessage, setErrorMessage ] = useState('');
  const { setAuth } = useContext(AuthContext);
  const { onClose, onConfirm, isOpen } = props;
  if (!isOpen) return null;

  const title = 'Confirm delete';
  const text = 'Are you sure you would like to delete? This cannot be undone';

  const confirm = async (evnt) => {
    evnt.preventDefault();
    onConfirm();
  }

  return (
    <>
      <div className={'overlay'} onClick={onClose}>
      </div>
      <div className={'modal'}>
        <Box className={'modal-content'}>
          <Typography variant={'h6'} className={'modal-title'}>
            {title}
          </Typography>

          <Typography variant={'body2'} className={'modal-text'}>
            {text}
          </Typography>

          <Typography variant={'caption'} className={'modal-error'}>
            {errorMessage}
          </Typography>
        </Box>

        <Box padding={2}>
          <Button 
            onClick={confirm}
            title='Confirm'
            variant='contained'
            category="action"
          />
          <Button 
            onClick={onClose}
            title='Cancel'
            variant='outlined'
            category="action"
          />
        </Box>
      </div>
    </>
    
  )
}
