import React, { useState, useEffect } from "react";

function EditTaskComponent(props) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const token = props.userID;
      const response = await fetch("http://localhost:8000/api/tasks/getTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID: props.userID, taskID: props.taskID }),
      });
      const data = await response.json();
      setTaskTitle(data.Task_title);
      setTaskDescription(data.Task_description);
    };
    fetchTaskDetails();
  }, [props.userID, props.taskID]);

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = props.userID;
    const response = await fetch("http://localhost:8000/api/tasks/putTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userID: props.userID,
        taskID: props.taskID,
        Task_title: taskTitle,
        Task_description: taskDescription,
      }),
    });
    props.onSave();
  };

  return (
    <div className="formDiv" id='taskEdit'>
      <h2>Edit Task</h2>
      <br></br><br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="taskDescription">Description :&nbsp;&nbsp;&nbsp;</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default EditTaskComponent;
