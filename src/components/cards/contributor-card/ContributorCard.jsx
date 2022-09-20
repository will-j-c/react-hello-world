import { useEffect, useState, useContext } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import Box from "@mui/material/Box";
import AvatarComponent from "../../avatar/Avatar";
import { Link } from "react-router-dom";
import Button from "../../buttons/Button";
import AuthContext from '../../../context/AuthProvider';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import '../Card.scss';

export default function ContributorCard(props) {

  const { _id, title, project_id, skills } = props.contributor;
  const { logo_url, slug } = project_id;
  const projectTitle = project_id.title;
  const projectOwner = project_id.user_id.username;
  const projectUrl = `/projects/${slug}`;
  const { auth } = useContext(AuthContext);
  const [ buttonTitle, setButtonTitle ] = useState('Following');
  const [ status, setStatus ] = useState(props.status);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let title = null;
    switch (props.status) {
      case 'not applied':
        title = 'Apply';
        break;
      case 'applied':
        title = 'Applied';
        break;
      case 'accepted':
        title = 'Accepted';
        break;
      case 'rejected':
        title = 'Rejected';
        break;
      default:
        title = "Apply"
    }
    
    setStatus(props.status)
    setButtonTitle(title)

  }, [props.status]);

  useEffect(() => {
    let title = null;
    switch (status) {
      case 'not applied':
        title = 'Apply';
        break;
      case 'applied':
        title = 'Applied';
        break;
      case 'accepted':
        title = 'Accepted';
        break;
      case 'rejected':
        title = 'Rejected';
        break;
      default:
        title = "Apply"
    }
    setButtonTitle(title)
  }, [status]);

  const handleAction = async function() {
    try {
      if (!auth.username) {
        props.triggerLogin();
        return;
      }
      if (status === 'not applied') {
        await axiosPrivate.post(`/contributors/${_id}/apply`);
        setStatus('applied');
      } else if (status === 'applied') {
        await axiosPrivate.delete(`/contributors/${_id}/withdraw`);
        setStatus('not applied');
      }
      return

    } catch (err) {
    }
  }

  const handleMouseOver = function() {
    if (buttonTitle === 'Applied') {
      setButtonTitle('Withdraw');
    }
  }

  const handleMouseLeave = function() {
    if (buttonTitle === 'Withdraw') {
      setButtonTitle('Applied');
    }
  }

  const skillsDisplay = skills.map((skill, idx) => {
    return (
      <Typography className='card-subtitle' key={idx} variant='caption'>
        {skill}
        {idx < skills.length - 1 ? ' |' : ''}
      </Typography>
    )
  })

  return (
    <Card raised={true}>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <AvatarComponent
          imgAlt={projectTitle}
          imgUrl={logo_url}
          sx={{ width: 80, height: 80 }}
        />

        <CardContent>

          <Typography variant='h6' className='card-title'>
            {title}
          </Typography>
          
          <Box className='card-captions'>
            <Typography className='card-subtitle' variant='body2'>
              For&nbsp; 
              <Link className='link' to={projectUrl}>
                <span id='card-highlightext'>{projectTitle}</span>
              </Link>
            </Typography>
          </Box>

          <Box className='card-captions'>
            {skillsDisplay}
          </Box>

        </CardContent>
      </Box>
      
      <CardActions>
        <Box>
          <Button
            category={'action'}
            title={'View'}
            variant={"outlined"}
            route={`/contributors/${_id}`}
          />
          { auth.username !== projectOwner && (
            <Button
              category={status === ('rejected' || 'accepted' ) ? 'status' : 'action'}
              title={buttonTitle}
              variant={buttonTitle === 'Apply' ? 'contained' : 'outlined'}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={handleAction}
            />
          )}
          { auth.username === projectOwner && (
            <>
              <Button
              category='action'
              title='Delete'
              variant='outlined'
              onClick={handleAction}
            />
              <Button
                category='action'
                title='Edit'
                variant='contained'
                route={`/contributors/${_id}/edit`}
              />
            </>
          )}
        </Box>
      </CardActions>
      
      
    </Card>
  )
}
