import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useRef } from "react";
import styles from './CommentAddField.module.scss'

function CommentAddField(props) {
  const formObj = {
    commentRef: useRef(),
  };
  const handleClick = () => {
    if (!formObj.commentRef.current.value) {
      return;
    }
    props.postComment(formObj.commentRef.current.value);
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{ backgroundColor: "var(--color1)" }}
      paddingX={1}
      width={1}
      className={styles['form']}
    >
      <TextField
        required
        hiddenLabel
        fullWidth
        variant="filled"
        type="text"
        className={styles['input-text']}
        inputRef={formObj.commentRef}
      />
      <ArrowForwardOutlinedIcon
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            cursor: "pointer",
          },
        }}
      />
    </Box>
  );
}

export default CommentAddField;
