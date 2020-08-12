import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.js";
import Loading from "./Loading.js";

// USE: home page, description of project
// PROPS: getTeamData (function)
const LOADING = "LOADING";
const TEAM = "TEAM";
const FAILURE = "FAILURE";
class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: LOADING,
      data: null,
      updated: false
    }
  }
  componentDidMount() {
    if (this.state.data === null) {
      this.props.getData(this);
    }
  }
  componentDidUpdate() {
    if (!this.state.updated) {
      this.props.updateData(this);
    }
  }
  render() {
    switch (this.state.status) {
      case LOADING:
        return <Loading/>;
        break;
      case FAILURE:
        return (
          <div className="failure">
            The maps have failed to load. Refresh the page. If an outage persists, contact the system administrator.
          </div>
        )
        break;
      case TEAM:
        const team = this.state.data.map((member) => {
          return (
            <div className="team-member">
              <h3 className="member-username">{member.username}</h3>
              <h4 className="member-name">a.k.a. {member.name}</h4>
              <div className="member-layout">
                <img className="member-img" src={member.img}/>
                <div className="member-content">
                  <div className="member-stats">
                    <div>
                      <div className="label">RANK</div>
                      <div className="stat">{member.rank}</div>
                    </div>
                    <div>
                      <div className="label">CURRENT MMR</div>
                      <div className="stat">{member.currentMMR}</div>
                    </div>
                    <div>
                      <div className="label">SEASON RANKED KD</div>
                      <div className="stat">{member.rankedKD}</div>
                    </div>
                    <div>
                      <div className="label">OVERALL RANKED KD</div>
                      <div className="stat">{member.overallRankedKD}</div>
                    </div>
                    <div>
                      <div className="label">OVERALL TIME PLAYED</div>
                      <div className="stat">{member.timePlayed}</div>
                    </div>
                    <div>
                      <div className="label">RANKED TIME PLAYED</div>
                      <div className="stat">{member.rankedTimePlayed}</div>
                    </div>
                    <div>
                      <div className="label">RANKED WIN %</div>
                      <div className="stat">{member.rankedWinPercentage}</div>
                    </div>
                    <div>
                      <div className="label">AVG RANKED KILLS/GAME</div>
                      <div className="stat">{member.killsPerGame}</div>
                    </div>
                    <div>
                      <div className="label">LAST MMR CHANGE</div>
                      <div className="stat">{member.mmrChange}</div>
                    </div>
                    <div>
                      <div className="label">GLOBAL RANK</div>
                      <div className="stat">{member.globalRank}</div>
                    </div>
                  </div>
                  <div className="member-attack">
                    <div>
                      <div className="label">TOP ATTACKER</div>
                      <div className="stat">{member.topAttackOperator}</div>
                    </div>
                    <div>
                      <div className="label">TIME PLAYED</div>
                      <div className="stat">{member.topAttackOperatorTime}</div>
                    </div>
                    <div>
                      <div className="label">KILLS</div>
                      <div className="stat">{member.topAttackOperatorKills}</div>
                    </div>
                    <div>
                      <div className="label">KD</div>
                      <div className="stat">{member.topAttackOperatorKD}</div>
                    </div>
                    <div>
                      <div className="label">HEADSHOT %</div>
                      <div className="stat">{member.topAttackOperatorHS}</div>
                    </div>
                    <div>
                      <div className="label">WIN %</div>
                      <div className="stat">{member.topAttackOperatorWP}</div>
                    </div>
                  </div>
                  <div className="member-defend">
                    <div>
                      <div className="label">TOP DEFENDER</div>
                      <div className="stat">{member.topDefendOperator}</div>
                    </div>
                    <div>
                      <div className="label">TIME PLAYED</div>
                      <div className="stat">{member.topDefendOperatorTime}</div>
                    </div>
                    <div>
                      <div className="label">KILLS</div>
                      <div className="stat">{member.topDefendOperatorKills}</div>
                    </div>
                    <div>
                      <div className="label">KD</div>
                      <div className="stat">{member.topDefendOperatorKD}</div>
                    </div>
                    <div>
                      <div className="label">HEADSHOT %</div>
                      <div className="stat">{member.topDefendOperatorHS}</div>
                    </div>
                    <div>
                      <div className="label">WIN %</div>
                      <div className="stat">{member.topDefendOperatorWP}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
        return (
          <div className="team">
            <Header heading={"Team"} description={"View our team members."}/>
            <main className="main">
              <div className="update">
                <h2 className="updating">{ this.state.updated ? "Updated at " + new Date().getHours() + ":" + new Date().getMinutes() : "Updating . . ." }</h2>
                { this.state.updated ? (<button onClick={() => {
                  this.setState({
                    updated: false
                  });
                }} className="force-refresh">Refresh</button>) : "" }
              </div>
              <div className="team-members">
                { team }
              </div>
            </main>
          </div>
        )
        break;
    }
  }
}

export default Team;
