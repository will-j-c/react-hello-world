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

import { useState, useContext, useEffect  } from 'react';
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
  
  const [ currentContributorData, setCurrentContributorData ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ skills, setSkills ] = useState([]);
  const [ projectTitle, setProjectTitle ] = useState('');
  const [ isRemote, setIsRemote ] = useState(true);
  const [ city, setCity ] = useState('');
  const [ selectedSkills, setSelectedSkills ] = useState([]);
  const [ commitment, setCommitment ] = useState('Low');
  const [ isPaid, setIsPaid ] = useState(false);
  const [ remuneration, setRemuneration ] = useState('');
  const [ availability, setAvailability ] = useState(1);
  const [message, setMessage] = useState('');
  const params = useParams();

  const theme = useTheme();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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
    if (!event.target.checked) {
      setRemuneration('');
    };
    setIsPaid(event.target.checked);
  }

  const availabilityChange = (event) => {
    setAvailability(event.target.value);
  }

  const titleChange = (event) => {
    setTitle(event.target.value);
  }

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const cityChange = (event) => {
    setCity(event.target.value);
  }

  const remunerationChange = (event) => {
    setRemuneration(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const is_remote = isRemote;
    const commitment_level = commitment;
    const available_slots = availability;
    const skills = selectedSkills;

    const formData = {
      title,
      is_remote,
      commitment_level,
      available_slots,
      remuneration,
      description,
      city,
      skills,
    }
    
    try {
      if (currentContributorData) {
        await axiosPrivate.put(`contributors/${params.id}`, formData);
        setMessage(`Contributor successfully saved. You will be redirected shortly...`);
        setTimeout(navigate, 1500, `/contributors/${params.id}`);
      } else {
        const response = await axiosPrivate.post(`/projects/${params.slug}/contributors`, formData)
        setMessage(`Contributor successfully created. You will be redirected shortly...`);
        setTimeout(navigate, 1500, `/contributors/${response.data._id}`);
      }

    } catch (error) {
      setMessage(error.response.data.error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const skillsData = await axios.get('/data/skills');
        let contributorData = null;
        let projectTitleData = null;

        if (params.id) {
          const response = await axios.get(`/contributors/${params.id}`);
          contributorData = response.data.contributor;
          projectTitleData = contributorData.project_id.title;

          setTitle(contributorData.title);
          setDescription(contributorData.description);
          setCity(contributorData.city);
          setIsRemote(contributorData.is_remote);
          setSelectedSkills(contributorData.skills);
          setCommitment(contributorData.commitment_level);
          setIsPaid(!!contributorData.remuneration);
          setRemuneration(contributorData.remuneration);
          setAvailability(contributorData.available_slots);

        } else {
          const response = await axios.get(`/projects/${params.slug}`);
          projectTitleData = response.data.project.title
        }

        setCurrentContributorData(contributorData);
        setSkills(skillsData.data);
        setProjectTitle(projectTitleData);
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
          { !currentContributorData && 'Create a new contributor position'}
          { currentContributorData && `Edit ${currentContributorData.title}`}
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
            value={title}
            placeholder='Ex. Front-end Developer'
            variant='filled'
            size='small'
            sx={{ marginBottom: 2 }}
            className='input-text'
            onChange={titleChange}
          />
          
          <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
            Short description
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            value={description}
            placeholder='Ex. Leading front-end development effort'
            variant='filled'
            size='medium'
            sx={{ marginBottom: 2 }}
            className='input-text'
            onChange={descriptionChange}
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
                placeholder='Ex. Singapore'
                value={city}
                variant='filled'
                size='small'
                sx={{ marginBottom: 2 }}
                className='input-text'
                onChange={cityChange}
              />
            )}
          </Box>

          <Typography variant="subtitle1" gutterBottom className='contributor-form-section-title'>
            Weekly commitment
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={'low'}
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
                value={remuneration}
                onChange={remunerationChange}
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
            { !currentContributorData && (
              <Button 
                variant='contained'
                category='action'
                title='Create'
                onClick={handleFormSubmit}
              />
            )}
            { currentContributorData && (
              <Button 
                variant='contained'
                category='action'
                title='Save'
                onClick={handleFormSubmit}
              />
            )}
            
          </Box>

        </form>
      </Box>
    </Box>
  )
}
