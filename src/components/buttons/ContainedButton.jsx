import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import './Buttons.scss';

const ModifiedButton = styled(Button)({
  fontWeight : 'bold',
  textTransform : 'none',
});

function ContainedButton(props) {
  // expected props {title, id, href, onClick, isFullWidth}
  const { title, type, url, onClick, isFullWidth } = props;
  return (
    <ModifiedButton 
      variant="contained" 
      id={type} 
      href={url} 
      onClick={onClick}
      fullWidth={isFullWidth}
    >
      {title}
    </ModifiedButton>
  );
}

export default ContainedButton;
