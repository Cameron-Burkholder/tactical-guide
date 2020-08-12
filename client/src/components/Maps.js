import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";
import Map from "./Map.js";
import Loading from "./Loading.js";

// USE: maps page, allow user to select map
// PROPS: getMapData (function)
const SELECT = "SELECT";
const LOADING = "LOADING";
const FAILURE = "FAILURE";
const MAPS = ["bank", "border", "chalet", "clubhouse", "coastline", "consulate", "kafe_dostoyevsky", "kanal", "oregon", "outback", "theme_park", "villa"];
class Maps extends React.Component {
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
      status: SELECT,
      stratIndex: 0
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
            <Map data={this.state.data} map={this.state.status}/>
          </div>
        );
        break;
    }
    return (
      <div className="maps">
        <Header heading={"Maps"} description={"Select a map to view our strategies."}/>
        <main className="main">
          { contents }
        </main>
      </div>
    )
  }
}

export default Maps;
