import React from "react";
import './buttons.css'

const ButtonRound = ({handleClick}) => {
    
    return (
        <button 
            id='upgrade'
            className="round" 
            onClick={handleClick}
            >
            START
        </button>
    )
}

export default ButtonRound