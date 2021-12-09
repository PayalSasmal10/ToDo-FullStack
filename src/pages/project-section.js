import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
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
  const [todoValues, setTodoValues] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get all tasks
  const getTodoLists = () => {
    axios
      .get('app/task', {
        headers: {
          Authorization: `JWT ${authCtx.token}`,
        },
      })
      .then((response) => {
        setTodoValues(response.data);
      });
  };

  useEffect(() => {
    if (!todoValues || loading) {
      getTodoLists();
    }
  }, []);

  return (
    <div className="project-section">
      <SideNav />
      <div className="main-section">
        <Header />
        {!authCtx.settingOpen ? (
          <ProjectToDo
            todoValues={todoValues}
            setTodoValues={setTodoValues}
            setLoading={setLoading}
            getTodoLists={getTodoLists}
          />
        ) : (
          <Settings />
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
