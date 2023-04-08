import React from "react";

function TaskListItem(props) {
  const handleTaskClick = () => {
    console.log(`Task clicked with ID: ${props.task.ID}`);
    props.onTaskClick(props.task.ID);
  };

  return (
    <li>
      <button onClick={handleTaskClick} style={{ backgroundColor: '#5E60CE', borderRadius: '10px'}}>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;{props.task.Task_title}&nbsp;&nbsp;&nbsp;&nbsp;
          {new Date(props.task.Create_date).toLocaleDateString()}
        </div>
      </button>
    </li>
  );
}

export default TaskListItem;
