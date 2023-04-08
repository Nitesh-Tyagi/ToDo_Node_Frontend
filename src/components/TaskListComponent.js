import React, { useState, useEffect } from "react";
import TaskDescriptionComponent from "./TaskDescriptionComponent";
import TaskListItem from "./TaskListItem";

function TaskListComponent(props) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = props.userID;
      const response = await fetch("http://localhost:8000/api/tasks/getTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID: props.userID }),
      });
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [props.userID]);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
    if (props.onTaskClick) {
      props.onTaskClick(taskId);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <TaskListItem
            key={task.ID}
            task={task}
            onTaskClick={() => handleTaskClick(task.ID)}
          />
        ))}
      </ul>
      {/* {selectedTask 
      && (
        <TaskDescriptionComponent
          userID={props.userID}
          taskID={selectedTask}
        />
      )
      } */}
    </div>
  );
}

export default TaskListComponent;
