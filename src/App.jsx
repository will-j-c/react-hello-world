import './App.css';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Container>
          <Outlet />
      </Container>
    </div>
  );
}

export default App;
