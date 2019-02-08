import React, { Component } from "react";

import Champion from "../components/champion";

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.matchData };
  }

  reposition(direction, position) {
    const data = [...this.state.matchData];
    const temp = data[position];
    if (direction === "up") {
      if (position === 0) {
        return;
      }
      data[position] = data[position - 1];
      data[position - 1] = temp;
      this.setState({ matchData: data });
    } else if (direction === "down") {
      if (position === data.length - 1) {
        return;
      }
      data[position] = data[position + 1];
      data[position + 1] = temp;
      this.setState({ matchData: data });
    }
  }

  render() {
    const champions = this.state.matchData.map((champion, index) => {
      return (
        <Champion
          key={champion.championId}
          position={index}
          arrayLength={this.state.matchData.length - 1}
          championData={champion}
          handleArrowClick={this.reposition.bind(this)}
        />
      );
    });
    return <div>{champions}</div>;
  }
}
