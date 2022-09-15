import Button from "@mui/material/Button";

function OutlinedButton(props) {
  return (
    <Button
    variant="outlined"
    size="small"
  >
    {props.name}
  </Button>
  );
}

export default OutlinedButton;