import Grid from "@mui/material/Unstable_Grid2";
import ProjectCard from "../cards/project-card/ProjectCard";
import { useState, useEffect, useContext } from "react";
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import LoginModal from '../modals/LoginModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ProjectIndexGrid() {
  const [projects, setProjects] = useState([]);
  const [followedProjects, setFollowedProjects] = useState([]);
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const username = auth?.username;

  const baseProjectImage =
    "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
  const baseProjectLogo = 'https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png';
  
  useEffect(() => {

    async function getData() {
      try {
        const projectsResp = await axios.get('/projects');
        setProjects(projectsResp.data);
        
        if (username) {
          const followedProjectsResp = await axiosPrivate
            .get(`/users/${username}/projects/following`);
          setFollowedProjects(
            followedProjectsResp.data.map(
              relation => relation.slug
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    getData();
    
  }, []);

  const projectCardsToShow = projects.map((project, idx) => {
    const projectCardDetails = {
      projectImg: project.image_urls[0] || baseProjectImage,
      title: project.title,
      tagline: project.tagline,
      logo: project.logo_url,
      categories: project.categories || baseProjectLogo,
      slug: project.slug
    };
    return (
      <Grid key={idx} xs={true} md={true} item>
        <ProjectCard 
          project={projectCardDetails}
          followed={followedProjects.includes(project.slug)}
          triggerLogin={() => setModalIsOpen(true)} 
        />
      </Grid>
    );
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, md: 12 }}
        justifyContent="center"
      >
        {projectCardsToShow}
      </Grid>
      <LoginModal
        isOpen={modalIsOpen} 
        onClose={() => setModalIsOpen(false)}
      />
    </>

  );
}

export default ProjectIndexGrid;
