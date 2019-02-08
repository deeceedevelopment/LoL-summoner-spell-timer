import React, { Component } from "react";
import Spell from "./spell";

export default class Champion extends Component {
  onArrowClick(direction) {
    this.props.handleArrowClick(direction, this.props.position);
  }

  render() {
    let repositionArrows;
    if (this.props.position === 0) {
      repositionArrows = (
        <i
          className="fas fa-arrow-down"
          style={{ fontSize: "40px", cursor: "pointer", marginRight: "10px" }}
          onClick={this.onArrowClick.bind(this, "down")}
        />
      );
    } else if (this.props.position === this.props.arrayLength) {
      repositionArrows = (
        <i
          className="fas fa-arrow-up"
          style={{ fontSize: "40px", cursor: "pointer", marginRight: "10px" }}
          onClick={this.onArrowClick.bind(this, "up")}
        />
      );
    } else {
      repositionArrows = (
        <React.Fragment>
          <i
            className="fas fa-arrow-down"
            style={{ fontSize: "40px", cursor: "pointer", marginRight: "10px" }}
            onClick={this.onArrowClick.bind(this, "down")}
          />
          <i
            className="fas fa-arrow-up"
            style={{ fontSize: "40px", cursor: "pointer", marginRight: "10px" }}
            onClick={this.onArrowClick.bind(this, "up")}
          />
        </React.Fragment>
      );
    }
    return (
      <div>
        <h4>Champion Component</h4>
        {repositionArrows}
        <img
          src={this.props.championData.championImageSrc}
          alt="champion portrait"
        />
        <Spell
          spellImageSrc={this.props.championData.spell1ImageSrc}
          spellDuration={this.props.championData.spell1Duration}
        />
        <Spell
          spellImageSrc={this.props.championData.spell2ImageSrc}
          spellDuration={this.props.championData.spell2Duration}
        />
      </div>
    );
  }
}
