import "./App.css";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import SiteHeader from "./components/site-header/SiteHeader";
function App(props) {
  return (
    <div className="App">
      <SiteHeader baseUrl={props.baseUrl} />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
