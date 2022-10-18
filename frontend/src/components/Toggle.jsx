import React from "react";

const Toggle = () => {
    return (
    <label className="toggle">
        <input type="checkbox" id="checkbox"/>
        <span className="slider2"></span>
        <span className="labels" data-on="STUDY" data-off="GAME"></span>
    </label>)
}

export default Toggle