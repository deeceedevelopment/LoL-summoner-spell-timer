import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Custom extends Component {
  render() {
    return (
      <div>
        <h1>Custom Page</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}
