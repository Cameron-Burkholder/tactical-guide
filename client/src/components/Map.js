import React from "react";
import ReactDOM from "react-dom";

import StrategySelector from "./StrategySelector.js";
import MapStrategy from "./MapStrategy.js";

// USE: display map
// PROPS: map (string), data (object)
const SELECT = "SELECT";
const PRIMARY = "PRIMARY";
const SECONDARY = "SECONDARY";
const TERTIARY = "TERTIARY";
const QUATERNARY = "QUATERNARY";
const MAP_REFERENCE = {
  "bank": "Bank",
  "border": "Border",
  "chalet": "Chalet",
  "clubhouse": "Clubhouse",
  "coastline": "Coastline",
  "consulate": "Consulate",
  "kafe_dostoyevsky": "Kafe Dostoyevsky",
  "kanal": "Kanal",
  "oregon": "Oregon",
  "outback": "Outback",
  "theme_park": "Theme Park",
  "villa": "Villa"
};
class Map extends React.Component {
  constructor(props) {
    super(props);

    this.viewSites = this.viewSites.bind(this);
    this.selectPrimary = this.selectPrimary.bind(this);
    this.selectSecondary = this.selectSecondary.bind(this);
    this.selectTertiary = this.selectTertiary.bind(this);
    this.selectQuaternary = this.selectQuaternary.bind(this);
    this.incrementStratIndex = this.incrementStratIndex.bind(this);
    this.decrementStratIndex = this.decrementStratIndex.bind(this);

    this.state = {
      status: SELECT,
      stratIndex: 0
    }
  }
  viewSites() {
    this.setState({
      status: SELECT,
      stratIndex: 0
    });
  }
  selectPrimary() {
    this.setState({
      status: PRIMARY,
      stratIndex: 0
    });
  }
  selectSecondary() {
    this.setState({
      status: SECONDARY,
      stratIndex: 0
    });
  }
  selectTertiary() {
    this.setState({
      status: TERTIARY,
      stratIndex: 0
    });
  }
  selectQuaternary() {
    this.setState({
      status: QUATERNARY,
      stratIndex: 0
    });
  }
  incrementStratIndex() {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.props.data[this.props.map].primary;
    } else if (this.state.status === SECONDARY) {
      site = this.props.data[this.props.map].secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.props.data[this.props.map].tertiary;
    } else {
      site = this.props.data[this.props.map].quaternary;
    }
    if (this.state.stratIndex + 1 < site.offense.length) {
      this.setState({
        stratIndex: this.state.stratIndex + 1
      });
    }
  }
  decrementStratIndex() {
    let site;
    if (this.state.status === PRIMARY) {
      site = this.props.data[this.props.map].primary;
    } else if (this.state.status === SECONDARY) {
      site = this.props.data[this.props.map].secondary;
    } else if (this.state.status === TERTIARY) {
      site = this.props.data[this.props.map].tertiary;
    } else {
      site = this.props.data[this.props.map].quaternary;
    }
    if (this.state.stratIndex -1 >= 0) {
      this.setState({
        stratIndex: this.state.stratIndex - 1
      });
    }
  }
  render() {
    switch (this.state.status) {
      case SELECT:
        return (
          <div className="map">
            <div className="map-heading">
              <h2 className="map-title">{MAP_REFERENCE[this.props.map]}</h2>
              <h3 className="map-bans">BANS - Attacker: {this.props.data[this.props.map].bans[0]}; Defender: {this.props.data[this.props.map].bans[1]}</h3>
            </div>
            <div className="map-site-gallery">
              <h3 className="map-site-gallery-description">Objectives</h3>
              <div className="map-site" id="primary-site">
                <img className="map-site-image" src={"./media/" + this.props.map + "-primary.png"}/>
                <button onClick={this.selectPrimary} className="map-site-button">{this.props.data[this.props.map].primary.site}</button>
              </div>
              <div className="map-site" id="secondary-site">
                <img className="map-site-image" src={"./media/" + this.props.map + "-secondary.png"}/>
                <button onClick={this.selectSecondary} className="map-site-button">{this.props.data[this.props.map].secondary.site}</button>
              </div>
              <div className="map-site" id="tertiary-site">
                <img className="map-site-image" src={"./media/" + this.props.map + "-tertiary.png"}/>
                <button onClick={this.selectTertiary} className="map-site-button">{this.props.data[this.props.map].tertiary.site}</button>
              </div>
              <div className="map-site" id="quaternary-site">
                <img className="map-site-image" src={"./media/" + this.props.map + "-quaternary.png"}/>
                <button onClick={this.selectQuaternary} className="map-site-button">{this.props.data[this.props.map].quaternary.site}</button>
              </div>
            </div>
          </div>
        )
        break;
      default:
        let site;
        if (this.state.status === PRIMARY) {
          site = this.props.data[this.props.map].primary;
        } else if (this.state.status === SECONDARY) {
          site = this.props.data[this.props.map].secondary;
        } else if (this.state.status === TERTIARY) {
          site = this.props.data[this.props.map].tertiary;
        } else {
          site = this.props.data[this.props.map].quaternary;
        }
        const stratIndex = this.state.stratIndex;
        const offensiveLineup = site.offense[stratIndex].operators.map((o, i) => {
          return (
            <div className="operator">
              <h4 className="operator-name">{site.offense[stratIndex].operators[i]}</h4>
              <img className="operator-image" src={"./media/" + site.offense[stratIndex].operators[i] + ".webp"}/>
              <p className="operator-role"><strong>Role:</strong> {site.offense[stratIndex].roles[i]}</p>
              <p className="operator-objective"><strong>Objective:</strong> {site.offense[stratIndex].objective[i]}</p>
            </div>
          )
        });
        const defensiveLineup = site.defense[stratIndex].operators.map((o, i) => {
          return (
            <div className="operator">
              <h4 className="operator-name">{site.defense[stratIndex].operators[i]}</h4>
              <img className="operator-image" src={"./media/" + site.defense[stratIndex].operators[i] + ".webp"}/>
              <p className="operator-role"><strong>Role:</strong> {site.defense[stratIndex].roles[i]}</p>
              <p className="operator-objective">{site.defense[stratIndex].locations[i]}</p>
            </div>
          )
        });
        return (
          <div className="map" id={this.props.map}>
            <button onClick={this.viewSites} className="map-site-return">View all objectives</button>
            <div className="map-site">
              <h2 className="map-title">{MAP_REFERENCE[this.props.map]}: {site.site}</h2>
              <div className="map-overview">
                <img className="map-overview-image" src={"./media/" + this.props.map + "-" + this.state.status.toLowerCase() + ".png"}/>
              </div>
              <StrategySelector stratIndex={this.state.stratIndex} length={site.offense.length} incrementStratIndex={this.incrementStratIndex} decrementStratIndex={this.decrementStratIndex}/>
              <MapStrategy class="offense" notes={site.offense[stratIndex].notes} lineup={offensiveLineup}/>
              <MapStrategy class="defense" notes={site.defense[stratIndex].notes} lineup={defensiveLineup}/>
            </div>
          </div>
        )
        break;
    }
  }
}

export default Map;
