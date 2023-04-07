import React, { Component } from "react";
import axios from "axios";

class EditTaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskTitle: "",
      taskDescription: "",
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ taskTitle: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ taskDescription: event.target.value });
  }

  handleEdit() {
    const { taskID, userID } = this.props;
    const url = `http://localhost:8000/api/tasks/putTask`;

    axios
      .put(url, {
        userID: userID,
        taskID: taskID,
        Task_title: this.state.taskTitle,
        Task_description: this.state.taskDescription,
      })
      .then((response) => {
        console.log(response);
        // Handle success response
      })
      .catch((error) => {
        console.log(error);
        // Handle error response
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={this.state.taskTitle}
          onChange={this.handleTitleChange}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={this.state.taskDescription}
          onChange={this.handleDescriptionChange}
        />
        <button onClick={this.handleEdit}>Edit Task</button>
      </div>
    );
  }
}

export default EditTaskComponent;
