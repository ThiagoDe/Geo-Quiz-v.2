import React from "react";

const Toggle = ({handleChange}) => {
    
    return (
    <label className="toggle">
        <input type="checkbox" id="checkbox" onChange={handleChange}/>
        <span className="slider2"></span>
        <span className="labels" data-on="STUDY" data-off="GAME"></span>
    </label>)
}

export default Toggle