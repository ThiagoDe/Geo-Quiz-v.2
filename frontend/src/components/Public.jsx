import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect, useRef } from 'react'
import ButtonRound from './utilities/ButtonRound'
import CircularAnimation from './utilities/CircularAnimation'
import { useAddNewTurnMutation } from '../features/turns/turnsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import Scoreboard from './utilities/Scoreboard'


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
        nextQuestionQueue() 
    }

    // <----- game logic ------>
    const [addNewTurn, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTurnMutation()

    const [time, setTime] = useState(5)
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [userId, setUserId] = useState(0)
    const [statesScored, setStatesScored] = useState([])
    const [statesMissed, setStatesMissed] = useState([])
    const [timer, setTimer] = useState(false)
    const previousQuestions = []
    const [currentQuestion, setCurrentQuestion] = useState('')
    
    const nextQuestionQueue = () => {
        if (usMap) {
            let i = Math.floor(Math.random() * ((usMap.length - 1) - 2 + 1) + 2)
            let state = usMap[i].dataset.name
            if (!previousQuestions.includes(state)){
                previousQuestions.push(state)
                setCurrentQuestion(state)
            } else {
                nextQuestionQueue()
            }
        }
    }

    useEffect(() => {
        // nextQuestionQueue() 
    }, [])


    const content = (
        <section className="public">
            <header className="dash-header">
                    <div>  </div>
                <div className="dash-header__container">
                    <h1>Welcome to <span className="nowrap">Geo-Quiz! </span></h1>
                </div>
                {/* {roundComplete && <h2>finshed</h2>} */}
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
                            <div className='round__center'>
                               <ButtonRound handleClick={handleClick} text='NEXT'/> 
                               <br/>
                               <br/>
                               
                               <h3>Where is {currentQuestion}?</h3>
                            </div>
                               } 

                            <div  style={{ width: "100px" }}>
                                <CircularAnimation time={time} animationOn={animationOn}/>
                            </div>
                        </>
                    }
                </div>

                <div className='main_map_score'>
                    <div>
                        <Scoreboard score={score} missed={missed}/>
                    </div>

                    <div className='map' onMouseMove={addMouseover} >
                        <SvgUs />
                    </div>
                    <p></p>
                </div>
                    { gameModeBtn.checked && <div id="details-box"></div>}
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public