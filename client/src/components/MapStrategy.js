import React from "react";
import ReactDOM from "react-dom";

// USE: display strategy
// PROPS: class (string), notes (string), lineup (html)
class MapStrategy extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);

    this.state = {
      collapse: true
    }
  }
  toggleCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    return (
      <div className={"map-" + this.props.class}>
        <h3 onClick={this.toggleCollapse} className={"map-" + this.props.class + "-title"}>{this.props.class === "offense" ? "Offensive" : "Defensive"} Strategy <span class={"caret-" + (this.state.collapse ? "down" : "up")}></span></h3>
        <div className={"map-" + this.props.class + "-content" + (this.state.collapse ? " inactive" : " active")}>
          <p className={"map-" + this.props.class + "-notes"}>{this.props.notes}</p>
          <div className="operator-lineup">
            {this.props.lineup}
          </div>
        </div>
      </div>
    )
  }
}

export default MapStrategy;
