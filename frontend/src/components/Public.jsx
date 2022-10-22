import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect } from 'react'
import ButtonRound from './utilities/ButtonRound'
// import CountdownProgressbar from './utilities/CountdownProgressBar'
import CircularAnimation from './utilities/CircularAnimation'

const Public = () => {
    const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState(null)
    const [pos, setPos] = useState({x: 0, y: 0})
    const [animationOn, setAnimationOn] = useState(0)

    const addMouseover = React.useCallback((e) => {
                // console.log(gameModeBtn.checked)
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

    const handleChange = () => {
        setGameModeBtn(!gameModeBtn)
    }
    const handleClick = () => {
        setAnimationOn(prev => prev + 1)
    }

    // <----- game logic ------>

    

    const content = (
        <section className="public">
            <header className="dash-header">
                <div className="dash-header__container">
                    <h1>Welcome to <span className="nowrap">Geo-Quiz!</span></h1>
                </div>
            </header>
            <main className="public__main">  
                <div className='game_display_container'>
                    <Toggle handleChange={handleChange}/>
                    {!gameModeBtn.checked && <ButtonRound handleClick={handleClick}/> }
                        <div style={{ width: "100px" }}>
                            <CircularAnimation time={4} animationOn={animationOn}/>
                        </div>
                    
                </div>
                <div className='map' onMouseMove={addMouseover} >
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