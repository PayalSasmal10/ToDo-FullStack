import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login-page';
import ProjectSection from './pages/project-section';
import AuthContext from './store/auth-context';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      {!isLoggedIn && (
        <Route path="/" exact>
          <LoginPage />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/task" exact>
          <ProjectSection />
        </Route>
      )}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </div>
  );
}

export default App;
