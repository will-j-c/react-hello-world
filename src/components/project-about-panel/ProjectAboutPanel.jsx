import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ProjectAboutPanel.css";
import Button from "../buttons/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function ProjectAboutPanel(props) {
  if (props.project) {
    const { description, image_urls, categories } = props.project;
    const images = image_urls.length ? (
      <ImageList
        cols={image_urls.length < 3 ? image_urls.length : 3}
      >
        {image_urls.map((item, idx) => (
          <ImageListItem key={idx} sx={{ marginTop: 2 }}>
            <img src={item} alt={item} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    ) : (
      <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
        Nothing here yet!
      </Typography>
    );
    const categoriesToDisplay = categories.length ? (
      categories.map((category, idx) => {
        return (
          <Button
            variant={"contained"}
            category={"category"}
            title={category}
            key={idx}
          />
        );
      })
    ) : (
      <Typography sx={{ color: "var(--color3)" }} variant={"body2"} marginY={2}>
        Nothing here yet!
      </Typography>
    );
    return (
      <Box marginTop={2}>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
          height={1}
        >
          About Project:
        </Typography>
        <Box sx={{ backgroundColor: "var(--color1)" }} padding={2}>
          <Typography sx={{ color: "var(--color4)" }} variant={"body2"}>
            {description || "Nothing here yet!"}
          </Typography>
        </Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Categories:
        </Typography>
        <Box display={"flex"}>{categoriesToDisplay}</Box>
        <Typography
          sx={{ color: "var(--color4)" }}
          fontWeight={"bold"}
          variant={"subtitle1"}
          marginY={2}
        >
          Images:
        </Typography>
        <Box display="flex" justifyContent={"center"}>{images}</Box>
      </Box>
    );
  }
}

export default ProjectAboutPanel;
