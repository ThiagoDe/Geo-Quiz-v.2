import React from "react";
import './buttons.css'

const ButtonRound = ({handleChange}) => {
    
    return (
        <button 
            id='upgrade'
            class="round" 
            onclick='upgrade("upgrade")'
            >
            START
        </button>
    )
}

export default ButtonRound