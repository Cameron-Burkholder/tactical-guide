import React from "react";
import ReactDOM from "react-dom";

// USE: display operator on operator page
// PROPS: name (string), strategies (jsx), usedBy (string), number (int)
class Operator extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);

    this.state = {
      display: false
    }
  }
  toggleCollapse() {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
      <div onClick={this.toggleCollapse} className={"operator" + (this.state.display ? "-display" : "-hide")}>
        <h4 className="operator-name">{this.props.name} ({this.props.number})</h4>
        <img className="operator-image" src={"./media/" + this.props.name + ".webp"}/>
        <p className="operator-description">Used in the following strategies:</p>
        <ul className="operator-strategies">
          { this.props.strategies }
        </ul>
        <p className="operator-usedby">Most Used by: {this.props.usedBy}</p>
      </div>
    )
  }
}

export default Operator;
