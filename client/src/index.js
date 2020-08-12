import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";

// Components
import Navigation from "./components/Navigation.js";
import Authentication from "./components/Authentication.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Error from "./components/Error.js";
import Home from "./components/Home.js";
import Team from "./components/Team.js";
import Maps from "./components/Maps.js";
import Admin from "./components/Admin.js";
import Operators from "./components/Operators.js";

// USE: manage routing and authentication
const UNVERIFIED = "UNVERIFIED";
const VERIFIED = "VERIFIED";
const LIGHT = "LIGHT";
const DARK = "DARK";
const SELECT = "SELECT";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const TEAM = "TEAM";
const OPERATORS = "OPERATORS";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.getToken = this.getToken.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.unverifyUser = this.unverifyUser.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.getMapData = this.getMapData.bind(this);
    this.getTeamData = this.getTeamData.bind(this);
    this.updateTeamData = this.updateTeamData.bind(this);
    this.getOperatorData = this.getOperatorData.bind(this);

    this.state = {
      status: (localStorage.getItem("auth_token") == null ? UNVERIFIED : VERIFIED),
      auth: localStorage.getItem("auth_token"),
      theme: (localStorage.getItem("theme") === LIGHT ? LIGHT : DARK)
    }
  }
  getToken() {
    return localStorage.getItem("auth_token");
  }
  verifyUser(auth_) {
    localStorage.setItem("auth_token", auth_.token);
    localStorage.setItem("auth_user", auth_.user);
    localStorage.setItem("auth_expiry", auth_.expiry);
    this.setState({
      status: (localStorage.getItem("auth_token") == null ? UNVERIFIED : VERIFIED),
      auth: localStorage.getItem("auth_token"),
      theme: this.state.theme
    });
  }
  unverifyUser() {
    localStorage.clear();
    this.setState({
      status: (localStorage.getItem("auth_token") == null ? UNVERIFIED : VERIFIED),
      auth: localStorage.getItem("auth_token"),
      theme: DARK
    });
  }
  toggleTheme() {
    localStorage.setItem("theme", (this.state.theme === DARK ? LIGHT : DARK));
    this.setState({
      status: this.state.status,
      auth: this.state.auth,
      theme: (this.state.theme === DARK ? LIGHT : DARK)
    });
  }
  getMapData(component) {
    fetch("/api/retrieve-map-data", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.getToken()
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status) {
        component.setState({
          status: SELECT,
          data: data.strategies
        })
      } else {
        component.setState({
          status: FAILURE
        });
      }
    });
  }
  getTeamData(component) {
    fetch("/api/retrieve-team-data", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.getToken()
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status) {
        component.setState({
          status: TEAM,
          data: data.data.data
        });
      } else {
        component.setState({
          status: FAILURE
        });
      }
    });
  }
  updateTeamData(component) {
    fetch("/api/update-team-data", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.getToken()
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status) {
        component.setState({
          status: TEAM,
          data: data.data.data,
          updated: true
        });
      } else {
        component.setState({
          status: FAILURE,
          updated: true
        });
      }
    });
  }
  getOperatorData(component) {
    fetch("/api/retrieve-operator-data", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.getToken()
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.status) {
        component.setState({
          status: OPERATORS,
          data: data.data
        });
      } else {
        component.setState({
          status: FAILURE
        });
      }
    });
  }
  render() {
    return (
      <Router>
        <div className={"container" + " container-" + (this.state.theme === DARK ? "dark" : "light")}>
          <Navigation status={this.state.status} unverify={this.unverifyUser} toggleSwitch={this.toggleTheme} checked={(this.state.theme === DARK)}/>
          <Switch>
            <Route exact path="/">
              { this.state.status === UNVERIFIED ? <Authentication verify={this.verifyUser}/> : <Home user={localStorage.getItem("auth_user")} expiry={localStorage.getItem("auth_expiry")}/> }
            </Route>
            <Route path="/maps">
              { this.state.status === UNVERIFIED ? <Redirect to="/"/> : <Maps getData={this.getMapData} getToken={this.getToken}/> }
            </Route>
            <Route path="/team">
              { this.state.status === UNVERIFIED ? <Redirect to="/"/> : <Team getData={this.getTeamData} updateData={this.updateTeamData} getToken={this.getToken}/> }
            </Route>
            <Route path="/operators">
              { this.state.status === UNVERIFIED ? <Redirect to="/"/> : <Operators getData={this.getOperatorData}/> }
            </Route>
            <Route path="/admin">
              { this.state.status === UNVERIFIED ? <Redirect to="/"/> : <Admin getData={this.getMapData} getToken={this.getToken}/> }
            </Route>
            <Route component={Error}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

const wrapper = document.querySelector("#wrapper");
ReactDOM.render(<App/>, wrapper);
