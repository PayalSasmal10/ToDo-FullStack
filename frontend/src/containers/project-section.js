import React from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header/header';
import SideNav from '../components/side-nav/side-nav';
import Projects from '../components/projects/projects';
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
  faSignOutAlt
);

const ProjectSection = () => {
  return (
    <div className="project-section">
      <SideNav />
      <div className="main-section">
        <Header />
        <Projects />
      </div>
    </div>
  );
};

export default ProjectSection;