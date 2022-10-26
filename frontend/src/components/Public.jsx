import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect, useRef } from 'react'
import ButtonRound from './utilities/ButtonRound'
import CircularAnimation from './utilities/CircularAnimation'
import { useAddNewTurnMutation } from '../features/turns/turnsApiSlice'
import { useSelector, useDispatch } from 'react-redux'


const Public = () => {
    const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState(null)
    const [pos, setPos] = useState({x: 0, y: 0})
    const [animationOn, setAnimationOn] = useState(0)

    const roundComplete = useSelector((state) => state.roundComplete.roundComplete) 

    const [firstRound, setFirstRound] = useState(true)


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

    const handleChange = () => {
        setFirstRound(true)
        setGameModeBtn(!gameModeBtn)
    }

    const handleClick = () => {
        setAnimationOn(prev => prev + 1)
        setFirstRound(false)
    }

    // <----- game logic ------>
    const [addNewTurn, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTurnMutation()

    const [time, setTime] = useState(15)
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [userId, setUserId] = useState(1)
    const [statesScored, setStatesScored] = useState([])
    const [statesMissed, setStatesMissed] = useState([])
    const [timer, setTimer] = useState(false)

    
    useEffect(() => {
        console.log(roundComplete, 'from public')
    }, [])

    const content = (
        <section className="public">
            <header className="dash-header">
                    <div>  </div>
                <div className="dash-header__container">
                    <h1>Welcome to <span className="nowrap">Geo-Quiz! </span></h1>
                </div>
                <div className='login_container'>
                    <Link to="/login">Login</Link>
                </div>
            </header>
            <main className="public__main">  
                <div  className='game_display_container'>
                    <Toggle handleChange={handleChange}/>
                    {!gameModeBtn.checked && 
                        <> 
                            { (roundComplete || firstRound ) ?
                            <ButtonRound handleClick={handleClick} text='START'/> :
                               <ButtonRound handleClick={handleClick} text='NEXT'/> } 

                            <div  style={{ width: "100px" }}>
                                <CircularAnimation time={4} animationOn={animationOn}/>
                            </div>
                        </>
                    }
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