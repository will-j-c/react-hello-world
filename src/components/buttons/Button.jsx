import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

import './Buttons.scss';

function StyledButton(props) {
  const { variant, title, category, route, onClick, isFullWidth, disabled=false, upload=false, onChange, single=true } = props;
  return (
    <Button
      className={`${category}`}
      sx={{fontWeight : 'bold', textTransform : 'none'}} 
      variant={variant}
      component={upload ? "label" : RouterLink}
      to={route} 
      onClick={onClick}
      fullWidth={isFullWidth}
      disabled={disabled}
    >
      {title}
      {upload ? single ? <input hidden accept=".png, .jpeg, .jpg*" type="file" onChange={onChange} /> : "" : ""}
    </Button>
  );
}

export default StyledButton;
