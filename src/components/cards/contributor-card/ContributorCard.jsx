import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import Box from "@mui/material/Box";
import AvatarComponent from "../../avatar/Avatar";
import { Link } from "react-router-dom";
import Button from "../../buttons/Button";

import '../Card.scss';

export default function ContributorCard(props) {

  const { _id, title, project_id, skills } = props.contributor;
  const { logo_url, slug } = project_id;
  const projectTitle = project_id.title;
  const projectUrl = `/projects/${slug}`;

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
            route={`/contributor/${_id}`}
          />
          <Button
            category={'action'}
            title={'Apply'}
            variant={"contained"}
          />
        </Box>
      </CardActions>
      
      
    </Card>
  )
}
