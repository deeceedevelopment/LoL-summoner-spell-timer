import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link style={{ marginBottom: "10px", display: "block" }} to="/sample">
          Sample Mode
        </Link>
        <Link style={{ marginBottom: "10px", display: "block" }} to="/custom">
          Custom Mode
        </Link>
        <Link style={{ marginBottom: "10px", display: "block" }} to="/search">
          Search Mode
        </Link>
        <Link style={{ marginBottom: "10px", display: "block" }} to="/team">
          Team Mode (beta)
        </Link>
        <Link style={{ marginBottom: "10px", display: "block" }} to="/admin">
          Admin Dashboard
        </Link>
      </div>
    );
  }
}
