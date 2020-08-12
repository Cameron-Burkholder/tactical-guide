import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import Switch from "./Switch.js";

const UNVERIFIED = "UNVERIFIED";
const VERIFIED = "VERIFIED";

// USE: navigation bar
// PROPS: status (string), unverify (function), toggleSwitch (function), checked (Boolean)
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      status: this.props.status
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  // USE: toggle menu state for mobile
  toggleMenu() {
    this.setState({
      active: !this.state.active,
      status: this.state.status
    });
  }
  // USE: update state for verification event
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        active: this.state.active,
        status: this.props.status
      });
    }
  }
  render() {
    if (this.state.status === VERIFIED) {
      return (
        <nav className={"nav " + (this.state.active ? "nav--active" : "nav--inactive")}>
          <h3 className="nav__heading">Phase Mandalorians Tactical Guide</h3>
          <ul className="nav__body">
            <li className="nav__item">
              <Link onClick={this.toggleMenu} className="nav__link" to="/">Home</Link>
            </li>
            <li className="nav__item">
              <Link onClick={this.toggleMenu} className="nav__link" to="/maps">Maps</Link>
            </li>
            <li className="nav__item">
              <Link onClick={this.toggleMenu} className="nav__link" to="/team">Team</Link>
            </li>
            <li className="nav__item">
              <Link onClick={this.toggleMenu} className="nav__link" to="/operators">Operators</Link>
            </li>
            <li className="nav__item">
              <Link onClick={this.toggleMenu} className="nav__link" to="/admin">Admin</Link>
            </li>
            <li className="nav__item">
              <Link onClick={this.props.unverify} className="nav__link" to="/">Deactivate</Link>
            </li>
            <li className="nav__item">
              <Switch toggleSwitch={this.props.toggleSwitch} checked={this.props.checked}/>
            </li>
          </ul>
          <a className="nav__button" onClick={this.toggleMenu}></a>
        </nav>
      )
    } else {
      return (
        <nav className={"nav " + (this.state.active ? "nav--active" : "nav--inactive")}>
          <h3 className="nav__heading">Phase Mandalorians Tactical Guide</h3>
        </nav>
      )
    }
  }
}

export default Navigation;
