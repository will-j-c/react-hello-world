import Button from "@mui/material/Button";

function OutlinedButton(props) {
  return (
    <Button
    variant="outlined"
    size="small"
    sx={{textTransform: "none"}}
  >
    {props.name}
  </Button>
  );
}

export default OutlinedButton;