import React from "react";
import './buttons.css'

const ButtonRound = ({handleClick, text}) => {
    
    return (
        <button 
            id='upgrade'
            className="round" 
            onClick={handleClick}
            >
            {text}
        </button>
    )
}

export default ButtonRound