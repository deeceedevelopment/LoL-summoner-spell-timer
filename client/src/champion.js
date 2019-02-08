import React, { Component } from "react";

export default class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.championData,
      spell1TimerRemaining: 300,
      spell2TimerRemaining: 180
    };
    // this.onSpell1Click = this.onSpell1Click.bind(this);
    // this.onSpell2Click = this.onSpell2Click.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState !== this.state ||
      nextProps.championData !== this.props.championData
    ) {
      return true;
    } else {
      return false;
    }
    if (nextProps.championData === this.props.championData) {
      console.log("Hah! I refuse to update!");
      return false;
    } else {
      return true;
    }
  }

  //this runs because PROPS has CHANGED
  componentDidUpdate(prevProps, prevState) {
    //this.props is the source of truth, you must make the state match it.
    if (prevProps.championData !== this.props.championData) {
      this.setState({ ...this.props.championData }, () => {
        if (this.state.spell1TimerActive && !prevState.spell1TimerActive) {
          console.log("Spell 1 Timer should be turned on!");
          this.turnOnTimer(1);
        }
        if (this.state.spell2TimerActive && !prevState.spell2TimerActive) {
          console.log("Spell 2 Timer should be turned on!");
          this.turnOnTimer(2);
        }
      });
    }
  }
  turnOnTimer(spell) {
    console.log("Turning on timer for spell: " + spell);
    let timerRef = `spell${spell}TimerRemaining`;
    setInterval(() => {
      this.setState({
        [timerRef]: this.state[timerRef] - 1
      });
      console.log(this.state[timerRef]);
    }, 1000);
  }

  onSpellClick() {
    this.props.handleSpellClick();
  }

  render() {
    console.log(`Champion component rendering. ID: ${this.state.championId}`);
    console.log();
    return (
      <div className="champion">
        <img alt="Alternative  Text" src={this.state.championImgUrl} />
        <img
          alt="Alternative  Text"
          src={this.state.spell1ImgUrl}
          onClick={this.onSpellClick.bind(this)}
        />

        <p>{this.state.spell1TimerRemaining}</p>

        <img
          alt="Alternative  Text"
          src={this.state.spell2ImgUrl}
          onClick={this.onSpellClick.bind(this)}
        />
      </div>
    );
  }
}
