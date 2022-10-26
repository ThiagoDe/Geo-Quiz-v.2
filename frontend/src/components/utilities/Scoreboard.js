import React from "react";
import './scoreboard.css'


const Scoreboard = ({score, missed}) => {


    return (
      <div className="scoreboard">
        <div className="header">
            <p>Scoreboard</p>
        </div>
        <div className="score_rows">
            <div className="row-name">
                <p>Score</p>
            </div>
            <div className="row-score">
                <div className="row-counter">
                    {<text>{score}</text>}
                </div>
            </div>
        </div>
        <div className="score_rows">
            <div className="row-name">
                <p>Missed</p>
            </div>
            <div className="row-score">
                <div className="row-counter">
                    {<text>{missed}</text>}
                </div>
            </div>
        </div>
        {/* <AddPlayerForm onAdd={this.onPlayerAdd} /> */}
      </div>
    );

}

export default Scoreboard