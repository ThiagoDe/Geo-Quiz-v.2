import { Link } from 'react-router-dom'
import SvgUs from './Us'
import React, { useState, useEffect } from 'react'

const Public = () => {
    const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState(null)
    // const [uniqState, setUniqState] = useState(null)
    const [pos, setPos] = useState({x: 0, y: 0})

    const addMouseover = React.useCallback((e) => {
                e.persist()
                setPos( pos => ({...pos, x: e.clientX, y: e.clientY}))
                const { x, y } = pos
                if (e.target.tagName === 'path') {
                    if (e.target.dataset.name !== stateName) 
                        setStateName(e.target.dataset.name)
                        setStateId(e.target.dataset.id)
                        if (gameModeBtn.checked){
                            boxInfo.style.display = "block";
                            boxInfo.innerHTML = stateName + " " + stateId;
                            boxInfo.style.opacity = "100%";            
                            boxInfo.style.top = (y + 25) + 'px';
                            boxInfo.style.left = (x) + 'px';
                        }
                } else {
                    if (gameModeBtn.checked && boxInfo){
                        boxInfo.style.opacity = "0%"
                    }
                }
            }, [boxInfo, pos, stateId, stateName, gameModeBtn])
    

    useEffect (() => {
        setUsMap(document.getElementsByTagName('path'))
        if (gameModeBtn.checked) {
            setBoxInfo(document.getElementById('details-box'))
        }
        setGameModeBtn(document.getElementById("checkbox"))
    
    }, [usMap, stateName, stateId, boxInfo, addMouseover, gameModeBtn] );
    

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Geo-Quiz!</span></h1>
            </header>
            <main className="public__main">
                <label className="toggle">
                    <input type="checkbox" id="checkbox"/>
                    <span className="slider2"></span>
                    <span className="labels" data-on="STUDY" data-off="GAME"></span>
                    
                </label>

                <div onMouseMove={addMouseover} >
                    <SvgUs />
                </div>
                { gameModeBtn.checked &&<div id="details-box"></div>}
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public