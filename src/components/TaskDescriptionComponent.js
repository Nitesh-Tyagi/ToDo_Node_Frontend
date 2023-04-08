import React, { useState, useEffect } from "react";
import EditTaskComponent from "./EditTaskComponent";

function TaskDescriptionComponent(props) {
  const [taskDetails, setTaskDetails] = useState(null);
  const [showEditTask, setShowEditTask] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const token = props.userID;
      const response = await fetch("http://localhost:8000/api/tasks/getTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ "userID": props.userID, "taskID": props.taskID })
      });
      const data = await response.json();
      setTaskDetails(data);
    };
    fetchTaskDetails();
  }, [props.userID, props.taskID]);

  const handleDelete = async () => {
    const token = props.userID;
    const response = await fetch("http://localhost:8000/api/tasks/delTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ "userID": props.userID, "taskID": props.taskID })
    });
    window.location.reload();
  }

  const handleEditClick = () => {
    setShowEditTask(true);
  }

  const handleEditClose = () => {
    setShowEditTask(false);
  }

  const handleEditSave = () => {
    setShowEditTask(false);
    window.location.reload();
  }

  if (!taskDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='formDiv' id='taskDesc'>
      <h2>{taskDetails.Task_title}</h2>
      <p>{taskDetails.Task_description}</p>
      <p>Created on: {new Date(taskDetails.Create_date).toLocaleDateString()}</p>
      <button onClick={handleEditClick}>Edit</button>
      &nbsp;
      <button onClick={handleDelete}>Delete</button>
      {showEditTask && <EditTaskComponent
        userID={props.userID}
        taskID={props.taskID}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />}
    </div>
  );
}

export default TaskDescriptionComponent;
