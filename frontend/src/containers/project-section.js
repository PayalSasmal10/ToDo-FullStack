import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faBell,
  faQuestionCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header/header';
import SideNav from '../components/side-nav/side-nav';
import './project-section.scss';

library.add(faChevronDown, faBell, faQuestionCircle, faSearch);

const ProjectSection = () => {
  return (
    <div className="project-section">
      <SideNav />
      <Header />
    </div>
  );
};

export default ProjectSection;
