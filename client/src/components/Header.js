import React from "react";
import ReactDOM from "react-dom";

// USE: reusable header component
// PROPS: heading (string), description (string)
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.writeText = this.writeText.bind(this);

    this.state = {
      heading: "",
      index: 0
    }

    this.writeText();
  }
  writeText() {
    if (this.state.heading.length < this.props.heading.length) {
      this.setState({
        heading: this.state.heading + this.props.heading.charAt(this.state.index),
        index: this.state.index + 1,
      });
      setTimeout(this.writeText, 100);
    }
  }
  render() {
    return (
      <header className="header">
        <h1 className="header__heading">{this.state.heading}</h1>
        <p className="header__description">{this.props.description}</p>
      </header>
    )
  }
}

export default Header;
