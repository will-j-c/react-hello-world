import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import AvatarComponent from "../avatar/Avatar";
import ProjectAboutPanel from "../project-about-panel/ProjectAboutPanel";
import ProjectContributorsPanel from "../project-contributors-panel/ProjectContributorsPanel";
import ShowTabs from "../show-tabs/ShowTabs";
import "./ProjectShowGrid.css";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import CommentPanel from "../comments/CommentPanel";

const baseProjectLogo =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

function ProjectShowGrid(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const slug = location.pathname.split("/").pop();
  const [project, setProject] = useState(null);
  const [contributors, setContributors] = useState(null);
  const [creator, setCreator] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios.get(`/projects/${slug}`).then(
      (response) => {
        setProject(response.data.project);
        setContributors(response.data.jobs);
        setCreator(response.data.createdBy);
      },
      (error) => {}
    );

    axios.get(`/comments/${slug}`).then(
      (response) => {
        setComments(response.data);
      },
      (error) => {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic for handling tabs
  useEffect(() => {
    if (project) {
      return setPanel(<ProjectAboutPanel project={project} />);
    }
  }, [project]);
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    return newTabValue === "1"
      ? setPanel(<ProjectAboutPanel project={project} />)
      : setPanel(
          <ProjectContributorsPanel
            creator={creator}
            contributors={contributors}
          />
        );
  };

  // Logic for posting a comment
  const postComment = (content) => {
    // If not authorised, send to login page
    if (!auth.username) {
      return navigate("/login");
    }
    console.log(auth)
    // If authorised, send post request for new comment
    axiosPrivate.post(`/comments/${slug}`, { content }).then(
      (response) => {
        console.log('Response', response);
      },
      (error) => {
        console.log('Error', error);
      }
    );
    // Update comments with a fetch request
  };

  return project ? (
    <>
      <Box display={"flex"} marginTop={4}>
        <AvatarComponent
          imgAlt={project.title}
          imgUrl={project.logo_url || baseProjectLogo}
          sx={{ width: 128, height: 128, border: "solid 1px var(--color3)" }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          marginLeft={5}
        >
          <Typography sx={{ color: "var(--color3)" }} variant={"h4"}>
            {project.title}
          </Typography>
          <Typography sx={{ color: "var(--color4)" }}>
            {project.tagline}
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        spacing={4}
        columns={{ xs: 1, md: 12 }}
        justifyContent="space-between"
        marginTop={4}
      >
        <Grid
          md={8}
          alignSelf={"flex-start"}
          paddingTop={0}
          height={1}
          sx={{ height: "100%" }}
          item
        >
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
            <ShowTabs tabValue={tabValue} handleTabChange={handleTabChange} />
            {project ? panel : ""}
          </Box>
        </Grid>
        <Grid md={4} sx={{ height: "100%" }} item>
          <CommentPanel comments={comments} postComment={postComment} />
        </Grid>
      </Grid>
    </>
  ) : (
    ""
  );
}

export default ProjectShowGrid;
