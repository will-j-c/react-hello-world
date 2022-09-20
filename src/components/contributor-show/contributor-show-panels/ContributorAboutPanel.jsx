import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import '../ContributorShow.scss';

export default function ContributorAboutPanel(props) {
  const { contributor, noOfAcceptance } = props;
  console.log(`available slots: ${contributor.available_slots}`);
  console.log(`acceptance: ${noOfAcceptance}`);

  const availability = Math.max(contributor.available_slots - noOfAcceptance, 0);

  const skillsDisplay = contributor?.skills?.length ? (
    contributor?.skills.map((skill, idx) => {
      return (
        <Box
          key={idx}
          sx={{ backgroundColor: "var(--color7a)" }}
          padding={1}
          marginRight={1}
          borderRadius={1}
        >
          <Typography variant='body2'>{skill}</Typography>
        </Box>
      );
    })
  ) : (
    <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
      Nothing here yet!
    </Typography>
  );

  return (
    <>
      <Typography variant='subtitle1' className='contributor-section-header'>
        Description:
      </Typography>
      <Box className='contributor-description'>
        <Typography sx={{ color: "var(--color4)" }} variant='subtitle1'>
          {contributor.description || "Nothing here yet!"}
        </Typography>
      </Box>
      <Typography variant='subtitle1' className='contributor-section-header'>
        Required skills:
      </Typography>
      <Box display={"flex"}>{skillsDisplay}</Box>
      <Box className='contributor-section-content'>
        <Typography variant='subtitle1' className='contributor-section-header'>
          Location:
        </Typography>
        <Typography variant='subtitle1' className='contributor-section-text'>
          {contributor?.is_remote ? 'Remote' : (contributor?.city || 'not applicable')}
        </Typography>
      </Box>
      <Box className='contributor-section-content'>
        <Typography variant='subtitle1' className='contributor-section-header'>
          Commitment level:
        </Typography>
        <Typography variant='subtitle1' className='contributor-section-text'>
          {contributor?.commitment_level}
        </Typography>
      </Box>
      <Box className='contributor-section-content'>
        <Typography variant='subtitle1' className='contributor-section-header'>
          Remuneration:
        </Typography>
        <Typography variant='subtitle1' className='contributor-section-text'>
          {contributor?.remuneration || 'not applicable'}
        </Typography>
      </Box>
      <Box className='contributor-section-content'>
        <Typography variant='subtitle1' className='contributor-section-header'>
          Number of positions available:
        </Typography>
        <Typography variant='subtitle1' className='contributor-section-text'>
          {contributor?.available_slots && (
            <>
              {availability} ({noOfAcceptance} out of {contributor.available_slots} filled)
            </>
          )}
        </Typography>
      </Box>
    </>
  )
}
