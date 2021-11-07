import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login-page';
import ProjectSection from './pages/project-section';
import AuthContext from './store/auth-context';
import './App.css';
import HomePage from './components/homepage/homepage';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log('isLoggedIn', isLoggedIn);
  return (
    <div className="App">
      <Route path="/" exact>
        <HomePage />
      </Route>
      {!isLoggedIn && (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}
      <Route path="/task" exact>
        {isLoggedIn && <ProjectSection />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      {/* <Route path="*">
        <Redirect to="/" />
      </Route> */}
    </div>
  );
}

export default App;
