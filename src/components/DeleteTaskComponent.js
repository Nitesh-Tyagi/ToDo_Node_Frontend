import React, { Component } from "react";
import axios from "axios";

class DeleteTaskComponent extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { taskID, userID } = this.props;
    const url = `http://localhost:8000/api/tasks/delTask`;

    axios
      .delete(url, {
        data: {
          taskID: taskID,
          userID: userID,
        },
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
        <button onClick={this.handleDelete}>Delete Task</button>
      </div>
    );
  }
}

export default DeleteTaskComponent;
