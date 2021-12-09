import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login-page';
import ProjectSection from './pages/project-section';
import AuthContext from './store/auth-context';
import HomePage from './components/homepage/homepage';
import icon from './images/favicon.ico';
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  // console.log('isLoggedIn', isLoggedIn);

  // Changing favicon
  useEffect(() => {
    const favicon = document.getElementById('favicon');
    favicon.setAttribute('href', icon);
  });

  return (
    <div className="App">
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/login">
        {!isLoggedIn && <LoginPage />}
        {isLoggedIn && <Redirect to="/task" />}
      </Route>
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
