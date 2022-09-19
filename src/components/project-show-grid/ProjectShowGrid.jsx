import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import AvatarComponent from "../avatar/Avatar";
import ProjectAboutPanel from "../project-about-panel/ProjectAboutPanel";
import ProjectContributorsPanel from "../project-contributors-panel/ProjectContributorsPanel";
import ShowTabs from "../show-tabs/ShowTabs";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CommentPanel from "../comments/CommentPanel";
import styles from "./ProjectShowGrid.module.scss";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ConfirmModal from "../modals/ConfirmModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [commentCount, setCommentCount] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState(null);
 
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
        setComments(response.data.commentsToSend);
        setCommentCount(response.data.commentCount);
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
    // If authorised, send post request for new comment
    axiosPrivate.post(`/comments/${slug}`, { content }).then(
      (response) => {
        // Update comments with a fetch request
        axios.get(`/comments/${slug}`).then(
          (response) => {
            setComments(response.data.commentsToSend);
            setCommentCount(response.data.commentCount);
          },
          (error) => {}
        );
      },
      (error) => {
        console.log("Error", error);
      }
    );
  };
  const [page, setPage] = useState(1);
  const handlePageChange = (error, value) => {
    setPage(value);

    axios.get(`/comments/${slug}?page=${page}`).then(
      (response) => {
        setComments(response.data.commentsToSend);
      },
      (error) => {
        setSeverity("error");
        setMessage("Failed to get comments");
      }
    );
  };
  useEffect(() => {
    navigate(`/projects/${slug}?page=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  // Logic for modal
  const handleDeleteClick = () => {
    setModalIsOpen(true);
  }
  const handleConfirm = () => {
    setModalIsOpen(false);
    console.log(project)
    axiosPrivate.delete(`projects/${project.slug}`).then((response) => {
      setOpen(true);
      setSeverity("success");
      setMessage("Successfully deleted project");
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    }, (error) => {
      setSeverity("error");
      setMessage("Failed to delete project");
    });
  }
  const handleClose = () => {
    setModalIsOpen(false);
  }
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
        {creator.username === auth.username ? (
          <Box display={"flex"} alignItems={"center"} marginLeft={35}>
            <ModeEditOutlineOutlinedIcon
              htmlColor={"var(--color3)"}
              fontSize={"large"}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
            <DeleteForeverOutlinedIcon
              onClick={handleDeleteClick}
              htmlColor={"var(--color3)"}
              fontSize={"large"}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        ) : (
          ""
        )}
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
        <Grid md={4} sx={{ height: "100%" }} paddingTop={0} item>
          <CommentPanel comments={comments} postComment={postComment} />
          <Pagination
            count={
              commentCount ? Math.floor(commentCount / comments.length) : 1
            }
            defaultPage={1}
            shape={"rounded"}
            className={styles["pagination"]}
            onChange={handlePageChange}
            page={page}
          />
        </Grid>
      </Grid>
      <ConfirmModal isOpen={modalIsOpen} onConfirm={handleConfirm} onClose={handleClose}/>
      <Snackbar open={open} autoHideDuration={6000} onClose={((event, reason) => {
        if (reason === 'timeout') {
          setOpen(false);
        }
      })}>
        <Alert variant="filled" severity={severity} sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </>
  ) : (
    ""
  );
}

export default ProjectShowGrid;
