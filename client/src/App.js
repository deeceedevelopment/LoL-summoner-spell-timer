import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./pages/admin";
import Home from "./pages/home";
import Custom from "./pages/custom";
import Sample from "./pages/sample";
import Search from "./pages/search";
import Team from "./pages/team";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/custom" component={Custom} />
            <Route path="/sample" component={Sample} />
            <Route path="/search" component={Search} />
            <Route path="/team" component={Team} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
