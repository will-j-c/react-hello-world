import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

import './Buttons.scss';

function StyledButton(props) {
  const { variant, title, category, route, onClick, isFullWidth, disabled=false } = props;
  return (
    <Button
      className={`${category}`}
      sx={{fontWeight : 'bold', textTransform : 'none'}} 
      variant={variant}
      component={RouterLink}
      to={route} 
      onClick={onClick}
      fullWidth={isFullWidth}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

export default StyledButton;
