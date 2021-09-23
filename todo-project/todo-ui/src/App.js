import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './pages/login-page';
import ProjectSection from './pages/project-section';

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/task" exact>
        <ProjectSection />
      </Route>
    </div>
  );
}

export default App;
