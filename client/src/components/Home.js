import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";

// USE: home page, description of project
// PROPS: user (string), expiry (Date object)
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const date = new Date(this.props.expiry);
    return (
      <div className="home">
        <Header heading={"Welcome, " + this.props.user}/>
        <main className="main">
          <p className="paragraph">You've authenticated this device to access the site resources. This device will remain authenticated until {(date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()} or unless manually deauthenticated. Exercise caution.</p>
        </main>
      </div>
    )
  }
}

export default Home;
