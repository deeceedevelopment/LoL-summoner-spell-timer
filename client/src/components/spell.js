import React, { Component } from "react";

import worker from "../worker.js";
import WebWorker from "../webWorker";

export default class Spell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spellActive: false,
      spellDuration: props.spellDuration,
      spellDurationRemaining: null
    };
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onSpellClick() {
    if (this.state.spellActive) {
      clearInterval(this.timerId);
      this.timerId = null;
      this.setState({ spellActive: false, spellDurationRemaining: null });
    } else {
      this.setState(
        {
          spellActive: true,
          spellDurationRemaining: this.state.spellDuration
        },
        () => {
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.timerId = setInterval(() => {
      if (this.state.spellDurationRemaining > 0) {
        const remainingTime = this.state.spellDurationRemaining - 1;
        this.setState({
          spellDurationRemaining: remainingTime
        });
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
        this.setState({ spellActive: false, spellDurationRemaining: null });
      }
    }, 1000);
  }

  render() {
    let timer = this.state.spellActive ? (
      <p
        style={{
          position: "absolute",
          color: "white",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        {this.state.spellDurationRemaining}
      </p>
    ) : null;
    return (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={this.onSpellClick.bind(this)}
      >
        <img
          style={this.state.spellActive ? { filter: "brightness(40%)" } : {}}
          src={this.props.spellImageSrc}
          alt="Summoner Spell"
        />
        {timer}
      </div>
    );
  }
}
