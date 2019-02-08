import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Match from "../components/match";
import SearchForm from "../components/searchForm";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMatchData: null,
      error: null
    };
  }

  handleFormSubmit(summonerName) {
    console.log("Searching for active game for Summoner: " + summonerName);
    axios
      .get(`/api/active-game/region/na1/summoner/${summonerName}`)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.setState({
            activeMatchData: {
              matchData: response.data.clientData,
              error: null
            }
          });
        } else {
          this.setState({
            activeMatchData: { error: response.data.error }
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          activeMatchData: { error: "ERROR! Something unexpected happened." }
        });
      });
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = <p>{this.state.error}}</p>;
    }
    let activeMatch = null;
    if (this.state.activeMatchData) {
      activeMatch = <Match matchData={this.state.activeMatchData} />;
    }
    return (
      <div>
        <h1>Search Page</h1>
        <Link to="/">Back to Home</Link>
        <SearchForm handleFormSubmit={this.handleFormSubmit.bind(this)} />
        {error}
        {activeMatch}
      </div>
    );
  }
}
