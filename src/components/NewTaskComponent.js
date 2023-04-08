import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function NewTaskComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { state } = useLocation();
  const userID = state.userID;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post('http://localhost:8000/api/tasks/postTask', {
        UserID: userID,
        Task_title: title,
        Task_description: description,
      });
      if (response.data) {
        setSuccess(true);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      setError('Failed to create task');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='formDiv'>
        <h2>Create New Task</h2>
        <br></br>
        <div>
          <label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Description :&nbsp;&nbsp;&nbsp;
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
        <br></br>
        {error && (
          <div className='formDiv' style={{ backgroundColor: '#ffcccc', color: '#990000', padding: '0px 25px 0px 25px' }}>
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className='formDiv' style={{ backgroundColor: '#ccffcc', color: '#006600', padding: '0px 25px 0px 25px' }}>
            <p>Task created successfully!</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default NewTaskComponent;
