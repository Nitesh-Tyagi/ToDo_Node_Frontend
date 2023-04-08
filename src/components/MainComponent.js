import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import TaskListComponent from './TaskListComponent';
import NewTaskComponent from './NewTaskComponent';

function MainComponent() {
  const location = useLocation();
  const userID = location.state?.userID;
  const username = location.state?.username;

  const handleAddTask = async (task) => {
    try {
      await axios.post('http://localhost:8000/api/tasks/postTask', task);
      // Reload tasks
      const response = await axios.get(`http://localhost:8000/api/tasks/${userID}`);
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
      {/* <h2>Welcome to the home page!</h2> */}
      {username && <h2>Welcome {username}</h2>}
      <div className='taskListComponent'><TaskListComponent userID={userID} /></div>
      <div className='box'><NewTaskComponent onAddTask={handleAddTask} userID={userID} /></div>
    </div>
  );
}

export default MainComponent;
