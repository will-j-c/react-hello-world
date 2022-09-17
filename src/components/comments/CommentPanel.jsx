import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Comment from "./Comment";
import CommentAddField from "./CommentAddField";

function CommentPanel(props) {
  const comments = props.comments ? props.comments : [];
  const commentsToShow = comments.map((comment, idx) => {
    return (
      <Grid padding={1} width={1} item key={idx}>
        <Comment comment={comment} />
      </Grid>
    );
  });
  return (
    <Box
      sx={{
        border: "solid 1px var(--color3)",
        height: "100%",
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
      <CommentAddField postComment={props.postComment} />
    </Box>
  );
}

export default CommentPanel;
