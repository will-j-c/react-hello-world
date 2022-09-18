import Avatar from "@mui/material/Avatar";

function AvatarComponent(props) {
  return (
    <Avatar alt={props.imgAlt} src={props.imgUrl} children={props.imgAlt ? props.imgAlt[0] : "U"} sx={props.sx} />
  );
}

export default AvatarComponent;