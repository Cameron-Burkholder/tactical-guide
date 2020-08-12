import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";
import MapEdit from "./MapEdit.js";
import Loading from "./Loading.js";

// USE: admin page, allow users to edit strat website
// PROPS: geData (function), getToken (function)
const LOADING = "LOADING";
const SELECT = "SELECT";
const FAILURE = "FAILURE";
const MAPS = ["bank", "border", "chalet", "clubhouse", "coastline", "consulate", "kafe_dostoyevsky", "kanal", "oregon", "outback", "theme_park", "villa"];
class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.selectMap = this.selectMap.bind(this);
    this.viewGallery = this.viewGallery.bind(this);

    this.state = {
      status: LOADING,
      data: null
    };
  }
  selectMap(map) {
    this.setState({
      status: map
    });
  }
  viewGallery() {
    this.setState({
      status: SELECT
    });
  }
  componentDidMount() {
    if (this.state.data === null) {
      this.props.getData(this);
    }
  }
  render() {
    let contents;
    switch (this.state.status) {
      case SELECT:
        contents = MAPS.map(map => {
          return (
            <div className="map-gallery-item">
              <img className="map-image" src={"./media/" + map + ".png"}/>
              <button onClick={() => {
                this.selectMap(map);
              }} className="map-button"></button>
            </div>
          )
        });
        break;
      case LOADING:
        contents = <Loading/>;
        break;
      case FAILURE:
        contents = (
          <div className="failure">
            The maps have failed to load. Refresh the page. If an outage persists, contact the system administrator.
          </div>
        );
        break;
      default:
        contents = (
          <div className="map-display">
            <button onClick={this.viewGallery} className="gallery-button">Back</button>
            <MapEdit token={this.props.getToken} data={this.state.data} map={this.state.status}/>
          </div>
        );
        break;
    }
    return (
      <div className="admin">
        <Header heading={"Admin"} description={"Edit our strategies."}/>
        <main className="main">
          { contents }
        </main>
      </div>
    )
  }
}

export default Admin;
