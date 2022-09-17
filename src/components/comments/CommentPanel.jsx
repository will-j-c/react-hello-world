import Grid from "@mui/material/Unstable_Grid2";
import Comment from "./Comment";
import CommentAddField from "./CommentAddField";


function CommentPanel(props) {
  const comments = props.comments;
  const commentsToShow = comments.map((comment, idx) => {
    return (
      <Grid padding={1} width={1} item key={idx}>
        <Comment comment={comment} />
      </Grid>
    );
  });
  return (
    <>
    <Grid
      flexDirection={"column-reverse"}
      alignItems={"center"}
      width={1}
      sx={{
        border: "solid 1px var(--color3)",
        height: "100%",
        backgroundColor: "var(--color2)",
      }}
      height={1}
      container
    >
      {commentsToShow}
      <Grid width={1} paddingX={1} alignSelf={"flex-end"} item>
        
      </Grid>
    </Grid>
    <CommentAddField postComment={props.postComment} />
    </>
  );
}

export default CommentPanel;
