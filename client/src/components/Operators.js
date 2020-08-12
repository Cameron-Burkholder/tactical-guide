import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";
import Loading from "./Loading.js";
import Operator from "./Operator.js";

// USE: display all operators used in strats
// PROPS: getData (function)
const LOADING = "LOADING";
const FAILURE = "FAILURE";
const OPERATORS = "OPERATORS";
class Operators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: LOADING,
      data: null
    }
  }
  componentDidMount() {
    if (this.state.data === null) {
      this.props.getData(this);
    }
  }
  render() {
    let contents;
    switch (this.state.status) {
      case LOADING:
        contents = <Loading/>;
        break;
      case FAILURE:
        contents = (
          <div className="failure">
            The operators have failed to load. Refresh the page. If an outage persists, contact the system administrator.
          </div>
        );
        break;
      case OPERATORS:
        const operators = Object.keys(this.state.data);
        contents = operators.map((operator) => {
          const strategies = this.state.data[operator].strats.map((site) => {
            return (
              <li className="operator-strategy">{site}</li>
            );
          })
          if (operator !== "" && operator !== "Other") {
            return (
              <Operator name={operator} strategies={strategies} number={strategies.length} usedBy={this.state.data[operator].usedBy}/>
            );
          }
        });
        break;
    }
    return (
      <div className="operators">
        <Header heading={"Operators"} description={"View the operators used in our strategies."}/>
        <main className="main">
          <div className="operator-container">
            { contents }
          </div>
        </main>
      </div>
    )
  }
}

export default Operators;
