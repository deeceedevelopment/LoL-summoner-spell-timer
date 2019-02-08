import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSummonerName: "",
      activeGameFound: false,
      redirectToMatch: false
    };
  }

  onInputChange(e) {
    const input = e.target.value;
    this.setState({ inputSummonerName: input });
  }

  onFormSubmit(e) {
    e.preventDefault();
    axios
      .get(`api/summoner/${this.state.inputSummonerName}`)
      .then(response => {
        if (response.data.success) {
          //ROOM CREATED, ID OF ROOM FOUND IN RESPONSE.DATA.PAYLOAD.ROOMID
          //REDIRECT TO MATCH COMPONENT
          //<Redirect to={{pathname: '/match', state: response.data.payload}} />
          //console.log(response.data.payload);
          // this.setState({ redirectToMatch: true });
          this.setState({
            roomId: response.data.payload.roomId,
            redirectToMatch: true
          });
        } else {
          console.log(response.data.error);
        }
      })
      .catch(error => {
        console.log("Error found:");
        console.log(error);
      });
  }
  render() {
    if (this.state.redirectToMatch) {
      const roomId = this.state.roomId;
      return <Redirect to={`/match/${roomId}`} />;
    }
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)} className="mt-5 pb-5">
          <div className="form-group">
            <label htmlFor="summonerName">Enter Summoner Name:</label>
            <input
              onChange={this.onInputChange.bind(this)}
              value={this.state.inputSummonerName}
              type="text"
              className="form-control"
              id="summonerName"
              placeholder="example: SKT T1 Faker"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>
      </div>
    );
  }
}
