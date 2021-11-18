import React, { useContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faBell,
  faQuestionCircle,
  faSearch,
  faHome,
  faTasks,
  faCalendar,
  faCog,
  faSignOutAlt,
  faTrashAlt,
  faEdit,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header/header';
import SideNav from '../components/side-nav/side-nav';
import ProjectToDo from '../components/project-todo/project-todo';
import Settings from '../components/settings-page/settings-page';
import AuthContext from '../store/auth-context';
import './project-section.scss';

library.add(
  faChevronDown,
  faBell,
  faQuestionCircle,
  faSearch,
  faHome,
  faTasks,
  faCalendar,
  faCog,
  faSignOutAlt,
  faTrashAlt,
  faEdit,
  faPlusSquare
);

const ProjectSection = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="project-section">
      <SideNav />
      <div className="main-section">
        <Header />
        {!authCtx.settingOpen ? <ProjectToDo /> : <Settings />}
      </div>
    </div>
  );
};

export default ProjectSection;
