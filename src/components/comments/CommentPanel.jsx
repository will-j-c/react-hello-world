import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Comment from "./Comment";
import CommentAddField from "./CommentAddField";
import ConfirmModal from "../modals/ConfirmModal";
import EditModal from "../modals/EditModal";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CommentPanel(props) {
  const comments = props.comments ? props.comments : [];
  const { auth, updateComments, setSnackbarAlert, postComment } = props;
  const axiosPrivate = useAxiosPrivate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editText, setEditText] = useState(null);
  const handleConfirm = () => {
    setModalIsOpen(false);
    axiosPrivate.delete(`comments/${deleteComment}`).then(
      (response) => {
        updateComments();
        setSnackbarAlert(true, "success", "Comment deleted");
      },
      (error) => {
        setSnackbarAlert(true, "error", "Failed to delete comment");
      }
    );
  };
  const handleConfirmEdit = () => {
    setEditModalIsOpen(false);
    axiosPrivate.put(`comments/${editComment}`, {content: editText}).then(
      (response) => {
        updateComments();
        setSnackbarAlert(true, "success", "Successfully edited comment");
      },
      (error) => {
        setSnackbarAlert(true, "error", "Failed to edit comment");
      }
    );
  };
  const handleDeleteClick = (ref) => (event) => {
    event.preventDefault();
    setModalIsOpen(true);
    setDeleteComment(ref.current.attributes.value.value);
  };
  const handleEditClick = (ref, content) => (event) => {
    event.preventDefault();
    setEditModalIsOpen(true);
    setEditText(content);
    setEditComment(ref.current.attributes.value.value)
  };
  const handleClose = () => {
    setModalIsOpen(false);
    setEditModalIsOpen(false);
  };
  const commentsToShow = comments.map((comment, idx) => {
    return (
      <Grid padding={1} width={1} item key={idx}>
        <Comment
          comment={comment}
          auth={auth}
          handleDelete={handleDeleteClick}
          handleEdit={handleEditClick}
        />
      </Grid>
    );
  });
  return (
    <Box
      sx={{
        border: "solid 1px var(--color3)",
        height: "100%",
        width: "100%",
        backgroundColor: "var(--color2)",
      }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Grid
        flexDirection={"column-reverse"}
        alignItems={"center"}
        width={1}
        height={1}
        container
        marginBottom={2}
      >
        {commentsToShow}
      </Grid>
      <CommentAddField postComment={postComment} />
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
      <EditModal
        isOpen={editModalIsOpen}
        onConfirm={handleConfirmEdit}
        onClose={handleClose}
        defaultText={editText}
        setNewText={setEditText}
      />
    </Box>
  );
}

export default CommentPanel;
