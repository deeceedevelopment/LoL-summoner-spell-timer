import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Team extends Component {
  render() {
    return (
      <div>
        <h1>Team Page</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}
