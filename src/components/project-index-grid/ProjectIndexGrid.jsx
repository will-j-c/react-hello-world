import Grid from "@mui/material/Unstable_Grid2";
import ProjectCard from "../cards/project-card/ProjectCard";
import { useState, useEffect, useContext } from "react";
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import LoginModal from '../modals/LoginModal';
import DeleteModal from "../modals/DeleteModal";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ProjectIndexGrid(props) {
  const [ projects, setProjects ] = useState([]);
  const [ followedProjects, setFollowedProjects ] = useState([]);
  const [ loginModalIsOpen, setLoginModalIsOpen ] = useState(false);
  const [ deleteModalIsOpen, setDeleteModalIsOpen ] = useState(false);
  const [ targetProject, setTargetProject ] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const username = auth?.username;
  const { filters, limit } = props;

  let filterParams = '?';
  let apiUrl = '/projects';

  if (filters) {
    Object.keys(filters).forEach((key, idx) => {
      const values = filters[key];
      if (values.length > 0) {
        filterParams += `${key}=${values.join(',').replaceAll(' ', '-')}`;
        if (idx < Object.keys(filters).length - 1 ) {
          filterParams += '&';
        };
      };
    });
  }

  if (limit) {
    if (filters) {
      filterParams += `&limit=${limit}`
    } else {
      filterParams += `limit=${limit}`
    }
  }

  if (filterParams.length > 1) {
    apiUrl += filterParams;
  }

  const baseProjectImage =
    "https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_960_720.jpg";
  const baseProjectLogo = 'https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png';
  
  useEffect(() => {
    async function getData() {
      try {
        const projectsResp = await axios
          .get(apiUrl);
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
      }
    }

    getData();
    
  }, [props, apiUrl]);

  const triggerDeleteModal = ({slug, title}) => {
    setTargetProject({slug, title});
    setDeleteModalIsOpen(true);
  }

  const deleteSuccessful = (slug) => {
    setProjects(prev => prev.filter(p => p.slug !== slug));
  }

  const projectCardsToShow = projects.map((project, idx) => {
    const projectCardDetails = {
      projectImg: project.image_urls[0] || baseProjectImage,
      title: project.title,
      tagline: project.tagline,
      logo: project.logo_url,
      categories: project.categories || baseProjectLogo,
      slug: project.slug,
      projectOwner: project.user_id.username,
      state: project.state,
    };
    return (
      <Grid key={idx} xs={true} md={4} item>
        <ProjectCard 
          project={projectCardDetails}
          followed={followedProjects.includes(project.slug)}
          triggerLogin={() => setLoginModalIsOpen(true)}
          triggerDeleteModal={triggerDeleteModal} 
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
        isOpen={loginModalIsOpen} 
        onClose={() => setLoginModalIsOpen(false)}
      />
      <DeleteModal 
        isOpen={deleteModalIsOpen}
        target={{project: targetProject}} 
        onClose={() => setDeleteModalIsOpen(false)}
        deleteSuccessful={deleteSuccessful}
      />
    </>

  );
}

export default ProjectIndexGrid;
