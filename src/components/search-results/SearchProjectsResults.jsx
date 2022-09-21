import { useEffect } from "react";
import ProjectIndexGrid from "../project-index-grid/ProjectIndexGrid";

export default function SearchProjectsResults(props) {
  const { query  } = props;
  useEffect(() => {
  }, [query]);
  return (
    <ProjectIndexGrid filters={{q: query}} />
  )
}
