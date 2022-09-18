import { useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import Box from "@mui/material/Box";
import AvatarComponent from "../../avatar/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Button from "../../buttons/Button";

import '../Card.scss';

export default function UserCard(props) {

  const { name, username, tagline, skills, interests, profile_pic_url } = props.user;
  const followed = props.followed;
  const [ buttonTitle, setButtonTitle ] = useState('Following');

  const skillsDisplay = skills.map((skill, idx) => {
    return (
      <Typography className='card-subtitle' key={idx} variant='caption'>
        {skill}
        {idx < skills.length - 1 ? ' |' : ''}
      </Typography>
    )
  })

  const interestsDisplay = interests.map((interest, idx) => {
    return (
      <Typography className='card-subtitle' key={idx} variant='caption'>
        {interest}
        {idx < interests.length - 1 ? ' |' : ''}
      </Typography>
    )
  })

  const handleMouseOver = function() {
    setButtonTitle('Unfollow');
  }

  const handleMouseLeave = function() {
    setButtonTitle('Following');
  }


  return (
    <Card raised={true}>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <AvatarComponent
          imgAlt={name}
          imgUrl={profile_pic_url}
          sx={{ width: 80, height: 80 }}
        />

        <CardContent>

          <Typography variant='h6' className='card-title'>
            {name}
          </Typography>
          <Typography variant="body2" className='card-tagline'>
            {tagline}
          </Typography>
          <Box className='card-captions'>
            {skillsDisplay}
          </Box>
          <Box className='card-captions'>
            {interestsDisplay}
          </Box>

        </CardContent>
      </Box>
      
      <CardActions>
        <Box>
          <Button
            category={'action'}
            title={'View'}
            variant={"outlined"}
            route={`/users/${username}`}
          />
          <Button
            category={'action'}
            title={followed ? `${buttonTitle}` : 'Follow'}
            variant={followed ? 'outlined' : 'contained'}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          />
        </Box>
      </CardActions>
      
      
    </Card>
  )
}
