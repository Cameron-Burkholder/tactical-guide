import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";

// USE: home page, description of project
// PROPS: verify (function)
const NAME = "NAME";
const SECRET = "SECRET";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.verifyName = this.verifyName.bind(this);
    this.encodeName = this.encodeName.bind(this);
    this.updateSecret = this.updateSecret.bind(this);
    this.verifySecret = this.verifySecret.bind(this);
    this.storeSecret = this.storeSecret.bind(this);
    this.encodeSecret = this.encodeSecret.bind(this);
    this.getToken = this.getToken.bind(this);

    this.state = {
      phase: NAME,
      name: "",
      secret: "",
      index: 0,
      user: ""
    }
  }
  updateName(event) {
    this.setState({
      phase: this.state.phase,
      name: event.target.value,
      secret: this.state.secret,
      index: this.state.index,
      user: event.target.value
    });
  }
  verifyName() {
    const component = this;
    fetch("/api/authenticate-name", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: component.state.user
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data) {
        component.setState({
          phase: SECRET,
          name: "",
          secret: "",
          index: 0,
          user: component.state.user
        })
      } else {
        component.setState({
          phase: FAILURE
        });
      }
    });
  }
  encodeName() {
    let asterisks = "";
    for (let i = 0; i < this.state.index; i++) {
      asterisks += "*";
    }
    this.setState({
      phase: this.state.phase,
      name: asterisks + this.state.name.split("").splice(this.state.index, this.state.name.length).join(""),
      secret: this.state.secret,
      index: this.state.index + 1,
      user: this.state.user
    });
    if (this.state.index <= this.state.name.length) {
      setTimeout(this.encodeName, 100);
    } else {
      setTimeout(() => {
        this.verifyName();
      }, 500);
    }
  }
  updateSecret(event) {
    this.setState({
      phase: this.state.phase,
      name: this.state.name,
      secret: event.target.value,
      index: this.state.index,
      user: this.state.user
    });
  }
  verifySecret() {
    const component = this;
    fetch("/api/authenticate-secret", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: component.state.secret_backup
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      setTimeout(() => {
        if (data) {
          component.getToken();
        } else {
          component.setState({
            phase: FAILURE
          });
        }
      }, 1000);
    });
  }
  storeSecret() {
    this.setState({
      phase: this.state.phase,
      name: this.state.name,
      secret_backup: this.state.secret,
      secret: this.state.secret,
      index: this.state.index + 1,
      user: this.state.user
    });
    setTimeout(this.encodeSecret, 100);
  }
  encodeSecret() {
    let asterisks = "";
    for (let i = 0; i < this.state.index; i++) {
      asterisks += "*";
    }
    this.setState({
      phase: this.state.phase,
      name: this.state.name,
      secret_backup: this.state.secret_backup,
      secret: asterisks + this.state.secret.split("").splice(this.state.index, this.state.secret.length).join(""),
      index: this.state.index + 1,
      user: this.state.user
    });
    if (this.state.index <= this.state.secret.length) {
      setTimeout(this.encodeSecret, 100);
    } else {
      setTimeout(() => {
        this.verifySecret();
      }, 500);
    }
  }
  getToken() {
    const component = this;
    fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.user
      })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      setTimeout(() => {
        if (data.status) {
          data.user = component.state.user;
          component.setState({
            phase: SUCCESS,
            name: "",
            secret: component.state.secret,
            index: 0,
            user: component.state.user,
            auth_: data
          });
        } else {
          component.setState({
            phase: FAILURE
          });
        }
      })
    });
  }
  render() {
    let contents;
    switch (this.state.phase) {
      case NAME:
        contents = (
          <div>
            <form className="authentication-form">
              <fieldset className="authentication-field">
                <label className="authentication-label" for="name">C://USERS/NAME></label>
                <input onChange={this.updateName} value={this.state.name} className="authentication-input" type="text" id="name"/>
              </fieldset>
            </form>
            <button onClick={this.encodeName} className="authentication-button">Enter</button>
          </div>
        )
        break;
      case SECRET:
        contents = (
          <div>
            <form className="authentication-form">
              <fieldset className="authentication-field">
                <label className="authentication-label" for="text">C://AUTH/SECRET></label>
                <input onChange={this.updateSecret} value={this.state.secret} className="authentication-input" type="text" id="secret"/>
              </fieldset>
            </form>
            <button onClick={this.storeSecret} className="authentication-button">Enter</button>
          </div>
        )
        break;
      case SUCCESS:
        contents = (
          <button onClick={() => {
            this.props.verify(this.state.auth_);
          }}className="authentication-button">Authenticate</button>
        )
        break;
      case FAILURE:
        contents = (
          <div className="failure">
            <h2 className="failure-heading">Failure</h2>
            <p className="failure-description">You have failed to authenticate yourself. You will remain unable to access this site until proper authentication has been completed.</p>
          </div>
        );
        break;
      default:
        break;
    }
    return (
      <div className="home">
        <Header heading={"Verify"} description={"Authenticate yourself to access the site."}/>
        <main className="main">
        { contents }
        </main>
      </div>
    )
  }
}

export default Authentication;
