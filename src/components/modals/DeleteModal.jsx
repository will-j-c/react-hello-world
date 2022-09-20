import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './Modal.scss';

import AuthContext from '../../context/AuthProvider';
import Button from '../buttons/Button';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function DeleteModal(props) {
  const [ message, setMessage ] = useState('');
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  
  if (!props.isOpen) return null;
  const { onClose } = props;

  const { projectSlug, projectTitle } = props.targetProject;

  const title = 'Delete confirmation';

  const deleteConfirm = async() => {
    try {
      await axiosPrivate.delete(`/projects/${projectSlug}`)
      setTimeout(onClose, 500);
      props.deleteSuccessful(projectSlug);
    } catch (err) {
      setMessage(err?.response?.data?.error);
    }
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
            Are you sure you would like to delete project <span className='highlight-text'>{projectTitle}</span>? This cannot be undone.
          </Typography>

          <Typography variant={'caption'} className={'modal-error'}>
            {message}
          </Typography>
        </Box>

        <Box padding={2}>
          <Button 
            onClick={deleteConfirm}
            title='Delete'
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
