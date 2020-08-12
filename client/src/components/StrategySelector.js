import React from "react";
import ReactDOM from "react-dom";

// USE: select strategy index
// PROPS: stratIndex (int), length (int), incrementStratIndex (function), decrementStratIndex (function)
class StrategySelector extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="strategy-selector">
        <button onClick={this.props.decrementStratIndex} className="strategy-selector-button"> &lt; </button>
        <p className="strategy-selector-heading">Strategy {this.props.stratIndex + 1}/{this.props.length}</p>
        <button onClick={this.props.incrementStratIndex} className="strategy-selector-button"> &gt; </button>
      </div>
    )
  }
}

export default StrategySelector;
