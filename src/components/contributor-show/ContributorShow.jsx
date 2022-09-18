import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarComponent from "../avatar/Avatar";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useContext, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";

import './ContributorShow.scss';

export default function ContributorShow() {
  const [ contributor, setContributor ] = useState({});
  const [ relations, setRelations ] = useState(null);
  const [ project, setProject ] = useState(null);
  const { auth } = useContext(AuthContext);
  const username = auth.username;
  const params = useParams();
  const id = params.id;
  const axiosPrivate = useAxiosPrivate();

  const baseProjectAvatar =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

  useEffect(() => {
    async function getData() {
      console.log(`useEffect running...`)
      const contributorData = await axios.get(`/contributors/${id}`);
      setContributor(contributorData.data.contributor);
      setRelations(contributorData.data.relations);
      setProject(contributorData.data.contributor.project_id);
    }

    getData()
  }, [])

  const skillsDisplay = contributor?.skills?.length ? (
    contributor?.skills.map((skill, idx) => {
      return (
        <Box
          key={idx}
          sx={{ backgroundColor: "var(--color7a)" }}
          padding={1}
          marginRight={1}
          borderRadius={1}
        >
          <Typography variant='body2'>{skill}</Typography>
        </Box>
      );
    })
  ) : (
    <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
      Nothing here yet!
    </Typography>
  );

  return (
    <>
      <Container>
        <Box display={"flex"} marginTop={5}>
          <AvatarComponent
            imgAlt={project?.title || 'placeholder'}
            imgUrl={project?.logo_url || baseProjectAvatar}
            sx={{ width: 128, height: 128, border: "solid 1px var(--color3)" }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            marginLeft={5}
          >
            <Typography variant="h4" component="h1" className='title'>
              {contributor?.title}
            </Typography>
            <Typography className='contributor-tagline' variant='h6' component="h2">
              For&nbsp;
              <Link className='link' to={`/projects/${project?.slug}`}>
                <span className='highlight-text'>{project?.title}</span>
              </Link> 
            </Typography>
          </Box>
        </Box>
        <Box className='contributor-content'>
          <Typography variant='subtitle1' className='contributor-section-header'>
            Description:
          </Typography>
          <Box className='description'>
            <Typography sx={{ color: "var(--color4)" }} variant='subtitle1'>
              {contributor.description || "Nothing here yet!"}
            </Typography>
          </Box>
          <Typography variant='subtitle1' className='contributor-section-header'>
            Required skills:
          </Typography>
          <Box display={"flex"}>{skillsDisplay}</Box>
          <Box className='contributor-section-content'>
            <Typography variant='subtitle1' className='contributor-section-header'>
              Location:
            </Typography>
            <Typography variant='subtitle1' className='contributor-section-text'>
              {contributor?.is_remote ? 'Remote' : (contributor?.city || 'not applicable')}
            </Typography>
          </Box>
          <Box className='contributor-section-content'>
            <Typography variant='subtitle1' className='contributor-section-header'>
              Commitment level:
            </Typography>
            <Typography variant='subtitle1' className='contributor-section-text'>
              {contributor?.commitment_level}
            </Typography>
          </Box>
          <Box className='contributor-section-content'>
            <Typography variant='subtitle1' className='contributor-section-header'>
              Remuneration:
            </Typography>
            <Typography variant='subtitle1' className='contributor-section-text'>
              {contributor?.remuneration || 'not applicable'}
            </Typography>
          </Box>
          <Box className='contributor-section-content'>
            <Typography variant='subtitle1' className='contributor-section-header'>
              Number of positions available:
            </Typography>
            <Typography variant='subtitle1' className='contributor-section-text'>
              {contributor?.available_slots || 'not applicable'}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  // ) : (
  //   ""
  );
}
