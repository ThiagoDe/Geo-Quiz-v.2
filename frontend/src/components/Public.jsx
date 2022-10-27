import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect, useRef } from 'react'
import ButtonRound from './utilities/ButtonRound'
import CircularAnimation from './utilities/CircularAnimation'
import { useAddNewRoundMutation } from '../features/rounds/roundsApiSlice'
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

    // const [firstRound, setFirstRound] = useState(true)
    const [gameOn, setGameOn] = useState(false)


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

       //Toggle  
    const handleChange = () => {
        setGameOn(false)
        setGameModeBtn(!gameModeBtn)
    }
        //Start animation
    const handleClick = () => {
        if (!gameOn)setAnimationOn(prev => prev + 1)
        setGameOn(true)
        // setFirstRound(false)
        nextQuestionQueue() 
    }

    // <----- game logic ------>
    const [addNewRound, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewRoundMutation()

    const time = 5
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [userId, setUserId] = useState(0)
    const [statesScored, setStatesScored] =  useState([])
    const [statesMissed, setStatesMissed] =  useState([])
    const [previousQuestions, setPreviousQuestions] = useState(['California'])
    const [currentQuestion, setCurrentQuestion] = useState('')
    
    const nextQuestionQueue = React.useCallback((e) => {
        if (usMap) {
            let i = Math.floor(Math.random() * ((usMap.length - 1) - 2 + 1) + 2)
            let state = usMap[i].dataset.name
            console.log(previousQuestions)
            if (!previousQuestions.includes(state)){
                setPreviousQuestions(previousQuestions.push(state))
                console.log(previousQuestions)
                setCurrentQuestion(state)
            } else {
                nextQuestionQueue()
            }
        }
    }, [previousQuestions, usMap])

    const onClickMap =  React.useCallback((e) => { 
        if (usMap){
            let clickedState = e.target.dataset.name 
            // console.log(clickedState)
            // console.log(stateI)
            // console.log(previousQuestions, 'prev on click')
            if (clickedState === previousQuestions[previousQuestions.length - 1]){
                statesScored.push(clickedState)
                e.target.style.fill = 'rgb(0, 131, 28)'
                setScore(score + 1)
                nextQuestionQueue()
            } else {
                setMissed(missed + 1)
                statesMissed.push(clickedState)
                e.target.style.fill = 'rgb(161, 0, 0)'
            }
            
        }

    }, [usMap, previousQuestions, score, statesScored, missed, nextQuestionQueue, statesMissed])



    useEffect(() => {
        // if (usMap) console.log(usMap[52]) 
    }, [usMap])


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
                            { (!roundComplete ) ?
                                <ButtonRound handleClick={handleClick} text='START'/> :
                            <div className='round__center'>
                               <ButtonRound handleClick={nextQuestionQueue} text='NEXT'/> 
                               <br/>
                               <br/>
                               
                               <h3>Where is {currentQuestion}?</h3>
                            </div>
                               } 

                            <div  style={{ width: "100px" }}>
                                <CircularAnimation time={time} animationOn={animationOn} />
                            </div>
                        </>
                    }
                </div>

                <div className='main_map_score'>
                    
                        <div className='scoreboard_container' style={!gameModeBtn.checked ? 
                            {visibility: 'visible'} : {visibility: 'hidden'}} >
                            <Scoreboard score={score} missed={missed}/>
                        </div>
                        
                    

                    <div className='map' onMouseMove={addMouseover} onClick={onClickMap}>
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