import Button from '@mui/material/Button';

import './Buttons.scss';

function StyledButton(props) {
  const { variant, title, category, url, onClick, isFullWidth } = props;
  return (
    <Button
      className={`${category}`}
      sx={{fontWeight : 'bold', textTransform : 'none'}} 
      variant={variant} 
      href={url} 
      onClick={onClick}
      fullWidth={isFullWidth}
    >
      {title}
    </Button>
  );
}

export default StyledButton;
