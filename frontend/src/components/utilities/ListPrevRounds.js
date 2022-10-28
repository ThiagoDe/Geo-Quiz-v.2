import React from "react";
import './listPrevRounds.css'


const ListPrevRounds = ({score, missed}) => {


    return (
      <div className="listPrevRounds">
        {/* <div className="header">
            <p>LISTPREVROUNDS</p>
        </div> */}
        <div className="score_rows">
            <div className="row-name" style={{color:'rgb(0, 131, 28)'}}>
                <p>CORRECT</p>
            </div>
            <div className="row-score">
                <div className="row-counter">
                    {<p>{score}</p>}
                </div>
            </div>
        </div>
        <div className="score_rows">
            <div className="row-name" style={{color:'red'}}>
                <p>MISSED</p>
            </div>
            <div className="row-score">
                <div className="row-counter">
                    {<p>{missed}</p>}
                </div>
            </div>
        </div>
        {/* <AddPlayerForm onAdd={this.onPlayerAdd} /> */}
      </div>
    );

}

export default ListPrevRounds