import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import useMediaQuery from '@mui/material/useMediaQuery';

const baseProjectLogo =
  "'https://i.pinimg.com/564x/a9/d6/7e/a9d67e7c7c1f738141b3d728c31b2dd8.jpg'";

function ProjectShowGrid(props) {
  const matches = useMediaQuery('(max-width:600px)');
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
  const updateComments = () => {
    axios.get(`/comments/${slug}`).then(
      (response) => {
        setComments(response.data.commentsToSend);
        setCommentCount(response.data.commentCount);
      },
      (error) => {}
    );
  };
  const setSnackbarAlert = (open, severity, message) => {
    setOpen(open);
    setSeverity(severity);
    setMessage(message);
  };
  useEffect(() => {
    axios.get(`/projects/${slug}`).then(
      (response) => {
        setProject(response.data.project);
        setContributors(response.data.jobs);
        setCreator(response.data.createdBy);
      },
      (error) => {}
    );
    updateComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic for handling tabs
  useEffect(() => {
    if (project) {
      return setPanel(<ProjectAboutPanel project={project} />);
    }
  }, [project]);

  const updateContributors = async () => {
    axios.get(`/projects/${slug}`).then(
      (response) => {
        setTabValue('2');
        setPanel(
          <ProjectContributorsPanel
            creator={response.data.createdBy}
            contributors={response.data.jobs}
            updateContributors={updateContributors}
          />
        );
        setContributors(response.data.jobs);
        setCreator(response.data.createdBy);
      },
      (error) => {}
    );
  }

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
            updateContributors={updateContributors}
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
        updateComments();
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
  };
  const handleConfirm = () => {
    setModalIsOpen(false);
    axiosPrivate.delete(`projects/${project.slug}`).then(
      (response) => {
        setOpen(true);
        setSeverity("success");
        setMessage("Successfully deleted project");
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      },
      (error) => {
        setSeverity("error");
        setMessage("Failed to delete project");
      }
    );
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  return project ? (
    <>
      <Box display={"flex"} marginTop={4}>
        <Box>
          <AvatarComponent
            imgAlt={project.title}
            imgUrl={project.logo_url || baseProjectLogo}
            sx={{ 
              width: matches ? 80 : 128, 
              height: matches ? 80 : 128, 
              border: "solid 1px var(--color3)" }}
          />
          
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={'center'}
          marginLeft={matches ? 2 : 5}
          flexWrap={"wrap"}
          flexGrow={1}
        >
          <Box>
            {project.state === "draft" || "archived" ? (
              <Typography sx={{ color: "var(--color7)" }} variant={"h6"}>
                {project.state.toUpperCase()}
              </Typography>
            ) : (
              ""
            )}
            <Typography sx={{ color: "var(--color3)" }} variant={"h4"}>
              {project.title}
            </Typography>
            <Typography sx={{ color: "var(--color4)" }}>
              {project.tagline}
            </Typography>
          </Box>
          <Box>
            {creator.username === auth.username ? (
              <Box display={"flex"} justifyContent={"center"} marginTop={2}>
                <Link
                  to={`/projects/${project.slug}/edit`}
                  state={{ project, isEdit: true }}
                >
                  <ModeEditOutlineOutlinedIcon
                    htmlColor={"var(--color3)"}
                    fontSize={"large"}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Link>
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
        <Grid md={4} sx={{ height: "100%", width: "100%" }} paddingTop={0} item>
          <CommentPanel
            comments={comments}
            postComment={postComment}
            auth={auth}
            updateComments={updateComments}
            setSnackbarAlert={setSnackbarAlert}
          />
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
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            setOpen(false);
          }
        }}
      >
        <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  ) : (
    ""
  );
}

export default ProjectShowGrid;
