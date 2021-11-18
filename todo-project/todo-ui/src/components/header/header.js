import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './header.scss';

const Header = (props) => {
  // const [drpDown, setDropDown] = useState(false);
  const authCtx = useContext(AuthContext);
  const user = authCtx.firstName;

  // const dropDown = (
  //   <div className="dropdown-class">
  //     <span>LogOut</span>
  //   </div>
  // );

  return (
    <div className="header">
      <div className="nav-section">
        <nav className="nav">
          <ul>
            <li>
              <FontAwesomeIcon icon="question-circle" />
            </li>
            {/* <li onClick={() => setDropDown(!drpDown)}>
              <FontAwesomeIcon icon="chevron-down" />
              {drpDown && dropDown}
            </li> */}
            <li>Hi, {user}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
