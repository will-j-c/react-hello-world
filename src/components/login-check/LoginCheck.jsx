import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from 'react';

import LoginModal from "../modals/LoginModal";
import Button from '../buttons/Button';

import '../contributor-form/ContributorForm.scss';

export default function LoginCheck() {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  return (
    <Box className='contributor-form-container'>
        <Typography variant='h4' component='h1' className='contributor-form-title'>
          Please log in to continue
        </Typography>
        <Box sx={{textAlign: 'center', marginTop: '2em'}}>
          <Button 
            title='Log in'
            variant='contained'
            category='action'
            onClick={() => setModalIsOpen(true)}
          />
          <Button 
            title='Back to home'
            variant='outlined'
            category='action'
            route='/'
          />
        </Box>
        <LoginModal 
          isOpen={modalIsOpen} 
          onClose={() => setModalIsOpen(false)}
        />
      </Box>
  )
}
