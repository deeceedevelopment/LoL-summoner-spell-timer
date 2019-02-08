import React, { Component } from "react";
import firebase from "firebase";

import Champion from "./champion";

//http://localhost:3000/match/-LVHNFuaKIvZOxyrcrNa

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championData: [],
      championDataReceived: false
    };
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyCPLzpMbh-HBKlJ6i3PhvibqmfWyN-kLig",
      authDomain: "my-first-deploy-277b2.firebaseapp.com",
      databaseURL: "https://my-first-deploy-277b2.firebaseio.com",
      projectId: "my-first-deploy-277b2",
      storageBucket: "my-first-deploy-277b2.appspot.com",
      messagingSenderId: "999687630820"
    };
    firebase.initializeApp(config);

    const roomId = this.props.match.params.id;
    this.setState({ roomId: roomId }, params => {
      this.initalizeFirebase()
        .then(response => {
          console.log("state.championData:");
          console.log(response);
          console.log(response[11]);
          let arrayOfIds = [];
          for (let id in response) {
            arrayOfIds.push(id);
          }
          console.log(arrayOfIds);
          this.setState({
            championData: response,
            championDataReceived: true,
            muhArray: arrayOfIds,
            [arrayOfIds[0]]: response[arrayOfIds[0]],
            [arrayOfIds[1]]: response[arrayOfIds[1]],
            [arrayOfIds[2]]: response[arrayOfIds[2]],
            [arrayOfIds[3]]: response[arrayOfIds[3]],
            [arrayOfIds[4]]: response[arrayOfIds[4]]
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
    firebase
      .database()
      .ref(`rooms/${roomId}`)
      .on("child_changed", (snapshot, prevChildKey) => {
        const newValue = snapshot.val();
        console.log(
          "A firebase value has changed!" + `Champion ID: ${snapshot.key}`
        );
        this.setState({ [snapshot.key]: newValue });
      });
  }

  initalizeFirebase() {
    const roomId = this.state.roomId;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`rooms/${roomId}`)
        .once("value")
        .then(dataSnapshot => {
          resolve(dataSnapshot.val());
        });
    });
  }

  handleSpellClick() {
    console.log("Running handleSpellClick in Match component.");
  }

  render() {
    const championComponents = [];
    if (this.state.championDataReceived) {
      //console.log("Match component rendering. Champion Data received.");
      this.state.muhArray.forEach(element => {
        const champion = this.state[element];
        //console.log(champion.championId);
        championComponents.push(
          <Champion
            key={champion.championId}
            championData={champion}
            handleSpellClick={this.handleSpellClick.bind(this)}
          />
        );
      });
    } else {
      //console.log("Match component rendering. No Champion Data received yet.");
    }
    return (
      <div>
        <h1>Match Component</h1>
        {championComponents}
      </div>
    );
  }
}
