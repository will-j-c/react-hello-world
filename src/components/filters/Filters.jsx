import Box from "@mui/material/Box";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useEffect, useState } from "react";

import './Filters.scss';

export default function Filters(props) {
  const { options, updateSelections, currentSelections } = props;
  const [ selections, setSelections ] = useState([]);

  useEffect(() => {
    setSelections(currentSelections);
  }, [props])
  
  const handleChange = (evnt) => {
    const option = evnt.target.name;
    const currentSelections = [...selections];
    let newSelections = [];
    if (evnt.target.checked) {
      newSelections = [...currentSelections, option];
    } else {
      newSelections = currentSelections.filter(selection => selection !== option)
    }
    setSelections([...newSelections]);
    updateSelections(newSelections);
  };
  
  const optionsDisplay = options.map((option, idx) => {
    return (
      <FormControlLabel
        key={idx}
        control={
          <Checkbox checked={selections.includes(option)} onChange={handleChange} name={option} />
        }
        label={option}
      />
    )
  })

  return (
    <Box sx={{ display: 'flex' }} className='filters'>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" className='filters-label'>Categories</FormLabel>
        <FormGroup>
          {optionsDisplay}
        </FormGroup>
      </FormControl>      

    </Box>
  )
}
