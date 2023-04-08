import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import TaskListComponent from './TaskListComponent';
import TaskDescriptionComponent from './TaskDescriptionComponent';
import NewTaskComponent from './NewTaskComponent';

function MainComponent(props) {
  const location = useLocation();
  const userID = location.state?.userID;
  const username = location.state?.username;

  const [tasks, setTasks] = useState([]);
  const [selectedTaskID, setSelectedTaskID] = useState(null);

  const handleTaskClick = (taskID) => {
    setSelectedTaskID(taskID);
  };

  const handleAddTask = async (task) => {
    try {
      await axios.post('http://localhost:8000/api/tasks/postTask', task, {
        headers: {
          Authorization: `Bearer ${userID}`
        }
      });
      // Reload tasks
      const response = await axios.post('http://localhost:8000/api/tasks/getTasks', { userID }, {
        headers: {
          Authorization: `Bearer ${userID}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.log('Failed to add task', error);
    }
  };

  return (
    <div>
      <nav>
        <ul className='Navv'>
          <li className='log'><Link to='/'>Login</Link></li>
          &nbsp;
          <li className='log'><Link to='/signup'>Sign Up</Link></li>
        </ul>
      </nav>
      {username && <h2>Welcome {username}</h2>}
      <div className='taskListComponent'>
        <TaskListComponent userID={userID} onTaskClick={handleTaskClick} />
      </div>
      <div className='box'>{selectedTaskID && (
        <TaskDescriptionComponent
          userID={userID}
          taskID={selectedTaskID}
        />
      )}</div>
      <div className='box'><NewTaskComponent onAddTask={handleAddTask} userID={userID} /></div>
    </div>
  );
}

export default MainComponent;
