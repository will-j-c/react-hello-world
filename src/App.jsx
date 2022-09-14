import './App.css';
import LoginGrid from './components/login-grid/LoginGrid';
import Container from '@mui/material/Container';
const baseUrl = 'http://localhost:8800';

function App() {
  return (
    <div className="App">
      <Container>
          <LoginGrid baseUrl={baseUrl}/>
      </Container>
      
    </div>
  );
}

export default App;
