import { gsap } from "gsap";
import TextPlugin from "gsap/TextPlugin";
import Typography from "@mui/material/Typography";
import { useRef, useEffect } from "react";
gsap.registerPlugin(TextPlugin);

function TitleHomepage(props) {
  const titleRef = useRef();
  useEffect(() => {
    gsap.to("#cursor", {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      duration: 0.75,
    });
    gsap.to("#title-text", {
      repeat: -1,
      yoyo: true,
      repeatDelay: 5,
      duration: 2,
      text: "Hello World",
    });
  }, []);
  return (
    <Typography
      variant={props.variant}
      textAlign={"center"}
      sx={{ color: "var(--color3)" }}
      fontWeight={"bold"}
      marginTop={props.marginTop}
      ref={titleRef}
    >
      <span id="title-text"></span>
      <span id="cursor">_</span>
    </Typography>
  );
}

export default TitleHomepage;
