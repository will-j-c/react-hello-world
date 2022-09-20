import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarComponent from "../avatar/Avatar";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import Button from '../buttons/Button';
import LoginModal from "../modals/LoginModal";
import DeleteModal from "../modals/DeleteModal";

import './ContributorShow.scss';

export default function ContributorShow() {
  const [ contributor, setContributor ] = useState({});
  const [ relations, setRelations ] = useState(null);
  const [ project, setProject ] = useState(null);
  const [ status, setStatus ] = useState('not applied');
  const [ buttonTitle, setButtonTitle ] = useState('Apply');
  const [ loginModalIsOpen, setLoginModalIsOpen ] = useState(false);
  const [ deleteModalIsOpen, setDeleteModalIsOpen ] = useState(false);
  const { auth } = useContext(AuthContext);
  const username = auth.username;
  const params = useParams();
  const id = params.id;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()

  const baseProjectAvatar =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

  const deleteSuccessful = () => {
    navigate(`/projects/${project?.slug}`);
  }

  useEffect(() => {
    async function getData() {
      const contributorData = await axios.get(`/contributors/${id}`);
      const relationsData = contributorData.data.relations;
      const relation = relationsData.filter(r => r.user_id.username === username);

      if (relation.length > 0) {
        let title = null;
        switch (relation[0].state) {
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
        setButtonTitle(title);
        setStatus(relation[0].state);
      }

      setContributor(contributorData.data.contributor);
      setRelations(contributorData.data.relations);
      setProject(contributorData.data.contributor.project_id);
    }

    getData()
  }, [])

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
    setButtonTitle(title);
  }, [status])

  const handleAction = async function() {
    try {
      if (!auth.username) {
        setLoginModalIsOpen(true);
        return;
      }
      if (status === 'not applied') {
        await axiosPrivate.post(`/contributors/${contributor?._id}/apply`);
        setStatus('applied');
      } else if (status === 'applied') {
        await axiosPrivate.delete(`/contributors/${contributor?._id}/withdraw`);
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

  return contributor ? (
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
          <Box className='contributor-actions'>
            {auth?.username === project?.user_id.username && (
              <>
                <Link to={`/contributors/${id}/edit`}>
                  <EditIcon 
                    sx={{
                      marginY: 1,
                      color: "var(--disable-color)",
                      "&:hover": {
                        color: "var(--color3a)",
                      },
                    }}
                    fontSize={"large"}
                    route={`/contributors/${id}/edit`}
                  />
                </Link>
                <DeleteForeverIcon 
                  sx={{
                    marginY: 1,
                    color: "var(--disable-color)",
                    "&:hover": {
                      color: "var(--color3a)",
                    },
                  }}
                  fontSize={"large"}
                  onClick={() => setDeleteModalIsOpen(true)}
                />
              </>
            )}

            {auth?.username !== project?.user_id.username && (
              <Button
                category={status === ('rejected' || 'accepted' ) ? 'status' : 'action'}
                title={buttonTitle}
                variant={buttonTitle === 'Apply' ? 'contained' : 'outlined'}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={handleAction}
              />
            )}
          </Box>
        </Box>
        <Grid 
          container 
          columns={{ xs: 1, md: 12 }} 
          justifyContent='space-between'
          spacing={4}
          marginTop={4}
        >
          <Grid item md={8}>
            <Box className='contributor-content'>
              <Typography variant='subtitle1' className='contributor-section-header'>
                Description:
              </Typography>
              <Box className='contributor-description'>
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
            
          </Grid>
          <Grid item md={4} >
            <Box className='contributor-content' height='100%'>
              <Typography variant='subtitle1' className='contributor-section-header'>
                Similar contributors
              </Typography>
              <Grid
                container
                spacing={2}
                columns={{ xs: 1, md: 12 }}
                justifyContent="center"
                alignItems="stretch"
              >
                <Typography className='contributor-section-text'>
                  To add later
                </Typography>
              </Grid>

            </Box>
          </Grid>
        </Grid>
        
      </Container>
      <LoginModal 
        isOpen={loginModalIsOpen} 
        onClose={() => setLoginModalIsOpen(false)}
      />
      <DeleteModal 
        isOpen={deleteModalIsOpen}
        target={{contributor: contributor}} 
        onClose={() => setDeleteModalIsOpen(false)}
        deleteSuccessful={deleteSuccessful}
      />
    </>
  ) : (
    ''
  );
}
