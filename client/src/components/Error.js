import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";

// USE: show user that the route has not found a page
const Error = function() {
  return (
    <div className="error">
      <Header heading={"The route requested couldn't be found."} description={"Are you sure you are supposed to be here?"}/>
      <main className="main">

      </main>
    </div>
  )
}
export default Error;
