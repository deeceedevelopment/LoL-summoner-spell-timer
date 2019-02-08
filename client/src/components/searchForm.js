import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerName: ""
    };
  }

  onInputChange(e) {
    this.setState({ summonerName: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.handleFormSubmit(this.state.summonerName);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>Summoner Name</label>
          <input
            onChange={this.onInputChange.bind(this)}
            value={this.state.summonerName}
            type="text"
            placeholder="Enter Summoner Name..."
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
