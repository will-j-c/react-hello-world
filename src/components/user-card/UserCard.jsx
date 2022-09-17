import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../avatar/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Button from "../buttons/Button";

export default function UserCard(props) {

  const { name, username, tagline, skills, interests, profile_pic_url} = props.user;

  const skillsDisplay = skills.map((skill, idx) => {
    return (
      <Typography
        key={idx}
        variant='body2'
        sx={{
          color:'var(--color4)'
        }}
      >
        {skill}
        {idx < skills.length - 1 ? ' |' : ''}
      </Typography>
    )
  })

  const interestsDisplay = interests.map((interest, idx) => {
    return (
      <Typography
        key={idx}
        variant='body2'
        sx={{
          color:'var(--color4)',
        }}
      >
        {interest}
        {idx < interests.length - 1 ? ' |' : ''}
      </Typography>
    )
  })

  return (
    <Card
      sx={{
        width: 1,
        height: 1,
        padding: 2,
        borderRadius: 0,
        backgroundColor: "var(--color1)",
        position: "relative",
        display: 'flex',
      }}
      raised={true}
    >
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <AvatarComponent
          imgAlt={name}
          imgUrl={profile_pic_url}
          sx={{ width: 80, height: 80 }}
        />

        <CardContent sx={{ 
          padding: 0, 
          marginTop: 1, 
          marginLeft: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.3
        }}>

          <Typography
            gutterBottom
            variant="h6"
            sx={{ color: 'var(--color3)', fontWeight: 600, marginBottom: 0 }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'var(--color7)'}}
          >
            {tagline}
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', flexFlow: 'wrap', gap: 0.5}}>
            {skillsDisplay}
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', flexFlow: 'wrap', gap: 0.5}}>
            {interestsDisplay}
          </Box>

        </CardContent>
      </Box>
      
      
    </Card>
  )
}
