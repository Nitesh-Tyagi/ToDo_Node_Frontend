import React, { useState, useEffect } from "react";

function TaskListComponent(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = props.userID;
      const response = await fetch("http://localhost:8000/api/tasks/getTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ "userID": props.userID })
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [props.userID]);

  return (
    <div>
      <h2>Task List</h2>
      {/* {props.userID && <p>Your userID: {props.userID}</p>} */}
      <ul>
        {tasks.map((task) => (
          <li key={task.Task_title}>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{task.Task_title}&nbsp;&nbsp;&nbsp;&nbsp;
            {new Date(task.Create_date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskListComponent;
