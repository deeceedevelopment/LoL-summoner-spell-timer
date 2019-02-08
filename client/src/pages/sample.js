import React, { Component } from "react";
import { Link } from "react-router-dom";

import Match from "../components/match";

import staticMatchData from "../config/staticMatch";

export default class Sample extends Component {
  render() {
    return (
      <div>
        <h1>Sample Page</h1>
        <Link style={{ marginBottom: "30px", display: "block" }} to="/">
          Back to Home
        </Link>
        <Match matchData={staticMatchData} />
      </div>
    );
  }
}
