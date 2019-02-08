import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

/*
    Need a button to initiate the Database Update (makes GET request to admin route)
    Display a success/failure message (make use of Axios error handling)
*/

export default class Admin extends Component {
  handleUpdateButtonClick() {
    console.log("Attempting to update the database...");
    axios
      .get("/api/admin/populate-database")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.statusText);
        //console.log(error.response.statusText);
      });
  }

  render() {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <Link style={{ marginBottom: "30px", display: "block" }} to="/">
          Back to Home
        </Link>
        <button onClick={this.handleUpdateButtonClick.bind(this)}>
          Update Database
        </button>
      </div>
    );
  }
}
