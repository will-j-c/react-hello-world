import date from "date-and-time";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarComponent from "../avatar/Avatar";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRef } from "react";

function Comment(props) {
  const { comment, auth, handleDelete, handleEdit } = props;
  const editComment = useRef();
  const deleteComment = useRef();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{ backgroundColor: "var(--color1)" }}
      paddingX={1}
    >
      <AvatarComponent
        imgUrl={comment.userProfilePic}
        imgAlt={comment.username}
        sx={{ width: 32, height: 32, border: "solid 1px var(--color3)" }}
      />
      <Box marginLeft={2} width={147}>
        <Typography
          variant="subtitle1"
          sx={{ color: "var(--color4)", fontWeight: "bold" }}
        >
          {comment.username}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--color4)" }}>
          {comment.content}
        </Typography>
        {comment.username === auth.username ? (
          <Box display={"flex"} justifyContent={"flex-start"} marginTop={2}>
            <ModeEditOutlineOutlinedIcon
              onClick={handleEdit(editComment, comment.content)}
              htmlColor={"var(--color3)"}
              ref={editComment}
              value={comment._id}
              fontSize={"small"}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
            <DeleteForeverOutlinedIcon
              onClick={handleDelete(deleteComment)}
              htmlColor={"var(--color3)"}
              fontSize={"small"}
              ref={deleteComment}
              value={comment._id}
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
      <Box marginLeft={2} width={45}>
        <Typography
          flexShrink={1}
          variant="body2"
          sx={{ color: "var(--color4)", fontSize: "0.5em" }}
        >
          {date.format(new Date(comment.updatedAt), "hh.mm A", "utc")}
        </Typography>
        <Typography
          flexShrink={1}
          variant="body2"
          sx={{ color: "var(--color4)", fontSize: "0.5em" }}
        >
          {date.format(new Date(comment.updatedAt), "DD MMM YYYY", "utc")}
        </Typography>
      </Box>
    </Box>
  );
}

export default Comment;
