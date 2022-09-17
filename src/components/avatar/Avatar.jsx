import Avatar from "@mui/material/Avatar";

function AvatarComponent(props) {
  return (
    <Avatar alt={props.imgAlt} src={props.imgUrl} children={props.imgAlt[0]} sx={props.sx} />
  );
}

export default AvatarComponent;