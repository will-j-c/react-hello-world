import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarComponent from "../avatar/Avatar";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import Button from '../buttons/Button';
import LoginModal from "../modals/LoginModal";
import DeleteModal from '../modals/DeleteModal';
import ContributorAboutPanel from "./contributor-show-panels/ContributorAboutPanel";
import ContributorApplicantsPanel from "./contributor-show-panels/ContributorApplicantsPanel";
import ContributorShowTabs from "./contributor-show-tabs/ContributorShowTabs";

import './ContributorShow.scss';

export default function ContributorShow() {
  const matches = useMediaQuery('(max-width:600px)');
  const [ contributor, setContributor ] = useState({});
  const [ relations, setRelations ] = useState(null);
  const [ project, setProject ] = useState(null);
  const [ status, setStatus ] = useState('not applied');
  const [ buttonTitle, setButtonTitle ] = useState('Apply');
  const [ tabValue, setTabValue ] = useState("1");
  const [ panel, setPanel ] = useState(null);
  const [ noOfAcceptance, setNoOfAcceptance ] = useState(0);

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

      const acceptances = relationsData.filter(r => r.state === 'accepted');

      setNoOfAcceptance(acceptances.length);
      setContributor(contributorData.data.contributor);
      setRelations(contributorData.data.relations);
      setProject(contributorData.data.contributor.project_id);
      setPanel(<ContributorAboutPanel contributor={contributorData.data.contributor} noOfAcceptance={acceptances.length}/>);
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

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    return newTabValue === "1"
      ? setPanel(<ContributorAboutPanel contributor={contributor} noOfAcceptance={noOfAcceptance}/>)
      : setPanel(
        <ContributorApplicantsPanel 
          applicants={relations} 
          noOfAcceptance={noOfAcceptance} 
          updateAcceptance={updateAcceptance}
          availableSlots={contributor.available_slots}
        />
      );
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

  const updateAcceptance = function() {
    setNoOfAcceptance(prev => prev + 1);
  }

  return contributor ? (
    <>
      <Container>
        <Box display={"flex"} marginTop={5}>
          <AvatarComponent
            imgAlt={project?.title || 'placeholder'}
            imgUrl={project?.logo_url || baseProjectAvatar}
            sx={{ 
              width: matches ? 80 : 128, 
              height: matches ? 80 : 128, 
              border: "solid 1px var(--color3)" 
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            marginLeft={matches ? 2 : 5}
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

            {(auth?.username !== project?.user_id.username && (status === 'rejected' || status === 'accepted')) && (
              <Button
                category={status === ('rejected' || 'accepted' ) ? 'status' : 'action'}
                title={buttonTitle}
                variant={buttonTitle === 'Apply' ? 'contained' : 'outlined'}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={handleAction}
              />
            )}

            {(auth?.username !== project?.user_id.username 
              && status !== 'rejected' 
              && status !== 'accepted' 
              && noOfAcceptance < contributor.available_slots) 
              && (
              <Button
                category={'action'}
                title={buttonTitle}
                variant={buttonTitle === 'Apply' ? 'contained' : 'outlined'}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={handleAction}
              />
            )}

            {(auth?.username !== project?.user_id.username 
              && status !== 'rejected' 
              && status !== 'accepted' 
              && noOfAcceptance >= contributor.available_slots) 
              && (
              <Button
                category={'status'}
                title={'All available slots filled'}
                variant={'outlined'}
              />
            )}
          </Box>
        </Box>

        <Box marginTop='2em'>
          {auth?.username === project?.user_id.username && (
            <Box
              sx={{
                border: "solid 1px var(--color3)",
                backgroundColor: "var(--color2)",
                height: "100%",
              }}
              paddingX={4}
              paddingBottom={4}
              id="panel-box"
              height={1}
            >
              <ContributorShowTabs 
                tabValue={tabValue} 
                handleTabChange={handleTabChange} 
              />
              { panel }
            </Box>
          )}
          
          {auth?.username !== project?.user_id.username && (
            <Box className='contributor-content'>
              <ContributorAboutPanel contributor={contributor} noOfAcceptance={noOfAcceptance}/>
            </Box>
            
          )}
          
        </Box>
        
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
