import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import './ProjectAboutPanel.css'

function ProjectAboutPanel(props) {
  console.log(props);
  if (props.project) {
    const { description, image_urls, categories } = props.project;

    return (
      <Box marginTop={2}>
        <Typography sx={{ color: "var(--color4)" }} variant={"subtitle1"}>
          About Project:
        </Typography>
        <Box sx={{ backgroundColor: "var(--color1)" }} padding={2}>
          <Typography sx={{ color: "var(--color4)" }} variant={"body2"}>
            {description || "Nothing here yet!"}
          </Typography>
        </Box>
        <Typography sx={{ color: "var(--color4)" }} variant={"subtitle1"}>
          Categories:
        </Typography>
        {categories.map(category => {
          return <Box backgroundColor="var(--color3)" width={50}/> 
        })}
        <Typography sx={{ color: "var(--color4)" }} variant={"subtitle1"}>
          Images:
        </Typography>
        <Box display="flex">
          {image_urls.map((image, idx, array) => {
            if (!array.length) {
              return 'Nothing here yet!';
            }
            return (
              <Box width={1/4} height={1/4} key={idx}>
                <img src={image} alt="Project snaps" className="project-img-show" />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

export default ProjectAboutPanel;
