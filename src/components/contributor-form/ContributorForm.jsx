import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { useState, useContext, useRef, useEffect  } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

import Button from "../buttons/Button";
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import LoginCheck from "../login-check/LoginCheck";

import './ContributorForm.scss'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(selection, selectionsList, theme) {
  return {
    fontWeight:
    selectionsList.indexOf(selection) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    color:
    selectionsList.indexOf(selection) === -1
        ? 'var(--color4)'
        : 'var(--color3)',
  };
}

export default function ContributorForm(props) {
  const { auth } = useContext(AuthContext);
  const username = auth?.username;
  
  const [ skills, setSkills ] = useState([]);
  const [ projectTitle, setProjectTitle ] = useState('');
  const [ isRemote, setIsRemote ] = useState(true);
  const [ selectedSkills, setSelectedSkills ] = useState([]);
  const [ commitment, setCommitment ] = useState('low');
  const [ isPaid, setIsPaid ] = useState(false);
  const [ availability, setAvailability ] = useState(1);
  const [message, setMessage] = useState('');
  const params = useParams();

  if (params.id) {
    
  }

  const theme = useTheme();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const formObj = {
    titleRef: useRef(),
    cityRef: useRef(),
    descriptionRef: useRef(),
    remunerationRef: useRef(),
  }

  const skillsSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const remoteCheckChange = (event) => {
    setIsRemote(event.target.checked);
  }

  const commitmentCheckChange = (event) => {
    setCommitment(event.target.value);
  }

  const payChange = (event) => {
    setIsPaid(event.target.checked);
  }

  const availabilityChange = (event) => {
    setAvailability(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const title = formObj.titleRef.current.value;
    const city = formObj.cityRef?.current?.value || '';
    const description = formObj.descriptionRef.current.value;
    const remuneration = formObj.remunerationRef?.current?.value || '';
    const is_remote = isRemote;
    const commitment_level = commitment;
    const available_slots = availability;
    const skills = selectedSkills;
    
    try {
      const response = await axiosPrivate.post(
          `/projects/${params.slug}/contributors`,
          {
            title,
            is_remote,
            commitment_level,
            available_slots,
            remuneration,
            description,
            city,
            skills
          }
        )
        setMessage(`Contributor successfully created. You will be redirected shortly...`);
        setTimeout(navigate, 1500, `/contributors/${response.data._id}`);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const skillsData = await axios.get('/data/skills');
        const projectData = await axios.get(`/projects/${params.slug}`);
        setSkills(skillsData.data);
        setProjectTitle(projectData.data.project.title);
      } catch (err) {}
    }

    getData();
  }, [])

  if (!username) {
    return <LoginCheck />
  }

  return  (
    <Box className='contributor-form-container'>
      <Box sx={{textAlign: 'center'}}>
        <Typography variant='h4' component='h1' className='contributor-form-title'>
          Create a new contributor position
        </Typography>
        <Typography variant='body1' component='h2' className='contributor-form-subtitle'>
          for project&nbsp;
          <span className='highlight-text'>{projectTitle}</span>
        </Typography>
        {message.length > 0 && (
          <Box sx={{marginTop: '1em'}}>
            <Typography variant={'caption'} className={'contributor-form-message'}>
              {message}
            </Typography>
          </Box> 
        )}
      </Box>

      <Box className='contributor-form'>
        <form>
          <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
            Title
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue='Ex. Front-end Developer'
            variant='filled'
            size='small'
            sx={{ marginBottom: 2 }}
            className='input-text'
            inputRef={formObj.titleRef}
          />

          <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
            Short description
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            defaultValue='Ex. Leading front-end development effort'
            variant='filled'
            size='medium'
            sx={{ marginBottom: 2 }}
            className='input-text'
            inputRef={formObj.descriptionRef}
          />

          <FormControl>
            <InputLabel id="skills-multiple-chip-label">Select skills</InputLabel>
            <Select
              labelId="skills-multiple-chip-label"
              id="skills-multiple-chip"
              multiple
              value={selectedSkills}
              onChange={skillsSelectChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skills.map((skill) => (
                <MenuItem
                  key={skill}
                  value={skill}
                  style={getStyles(skill, selectedSkills, theme)}
                >
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box className='contributor-form-remote-section'>
            <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
              Location
            </Typography>
            <FormControlLabel
              control={
                <Checkbox checked={isRemote} onChange={remoteCheckChange} name="Remote" />
              }
              label="Remote"
            />

            { !isRemote && (
              <TextField
                required
                hiddenLabel
                fullWidth
                defaultValue='Ex. Singapore'
                variant='filled'
                size='small'
                sx={{ marginBottom: 2 }}
                className='input-text'
                inputRef={formObj.cityRef}
              />
            )}
          </Box>

          <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
            Weekly commitment
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="low"
            name="radio-buttons-group"
            value={commitment}
            onChange={commitmentCheckChange}
            row
          >
            <FormControlLabel value="high" control={<Radio />} label="High (>40hrs)" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium (20-30hrs)" />
            <FormControlLabel value="low" control={<Radio />} label="Low (<10hrs)" />
          </RadioGroup>

          <Box className='contributor-form-remote-section'>
            <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
              Remuneration
            </Typography>
            <FormControlLabel
              control={
                <Checkbox checked={isPaid} onChange={payChange} name="remuneration" />
              }
              label="Provided"
            />

            { isPaid && (
              <TextField
                required
                hiddenLabel
                fullWidth
                defaultValue='$100/week'
                variant='filled'
                size='small'
                sx={{ marginBottom: 2 }}
                className='input-text'
                inputRef={formObj.remunerationRef}
              />
            )}
          </Box>

          <Box className='contributor-form-inline-section'>
            <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
              Available slots
            </Typography>
            <Select
              value={availability}
              label="availability"
              onChange={availabilityChange}
              className='availability-select'
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Box>

          <Box className='contributor-form-action-buttons'>
            <Button 
              variant='outlined'
              category='action'
              title='Cancel'
            />
            <Button 
              variant='contained'
              category='action'
              title='Create'
              onClick={handleFormSubmit}
            />
          </Box>

        </form>
      </Box>
    </Box>
  )
}
