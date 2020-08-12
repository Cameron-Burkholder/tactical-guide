import React from "react";
import ReactDOM from "react-dom";

// USE: switch data
// PROPS: toggleSwitch (function), checked (Boolean)
class Switch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <label className="switch">
        <input checked={this.props.checked} onChange={this.props.toggleSwitch} type="checkbox"/>
        <span className="slider round"></span>
      </label>
    )
  }
}

export default Switch;
