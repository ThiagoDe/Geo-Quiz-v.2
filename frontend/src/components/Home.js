import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect} from 'react'
import ButtonRound from './utilities/ButtonRound'
import CircularAnimation from './utilities/CircularAnimation'
import { useAddNewRoundMutation } from '../features/rounds/roundsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import Scoreboard from './utilities/Scoreboard'
import { resetGame, startGame } from "../features/roundGame/gameSlice";
import ListPrevRounds from './utilities/ListPrevRounds'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import BarChart from './BarChart'
import ModalLeft from './utilities/ModalLeft'
import Footer from './utilities/Footer'
import Pie from './utilities/pies/Pie'
import MissedPie from './utilities/pies/MissedPie'

const Home = () => {
    const { username, userId } = useAuth()
    // console.log(useAuth(), 'useauth here')
    const [currentId, setCurrentId ] = useState(userId)
    const navigate = useNavigate()

    
    const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState(null)
    const [pos, setPos] = useState({x: 0, y: 0})
    const dispatch = useDispatch()
    
    const roundComplete = useSelector((state) => state.roundComplete.roundComplete)
    const gameOn = useSelector((state) => state.roundComplete.gameOn) 
    
    const [defsSvg, setDefsSvg] = useState()
    const [textsSvg, setTextsSvg] = useState()

    
    const [addNewRound, 
        // isLoading,
        // isSuccess,
        // isError,
        // error
   ] = useAddNewRoundMutation()

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
        setUsMap(document.getElementById('us_svg__svg').getElementsByTagName('path'))
        if (gameModeBtn.checked) {
            setBoxInfo(document.getElementById('details-box'))
        }
        setGameModeBtn(document.getElementById("checkbox"))
    }, [usMap, stateName, stateId, boxInfo, addMouseover, gameModeBtn] );

    useEffect(() => {
        setDefsSvg(document.getElementsByTagName('defs'))
    }, [defsSvg])

    useEffect(() => {
        if (defsSvg) {
            for (let i = 0; i < defsSvg.length; i++) {
                defsSvg[i].style = "@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap')"
                defsSvg[i].style.fontFamily = 'Courier Prime'
            }
        }
    }, [defsSvg])

    useEffect(() => {
        setTextsSvg(document.getElementsByTagName('text'))
    }, [textsSvg])
    
    if (textsSvg) {
        for (let i = 0; i < textsSvg.length; i++) {
            textsSvg[i].style.fontFamily = 'Courier Prime'
        }
    }

    useEffect(() => {
        const fontsDefault = async() => {
            let loaded = await textsSvg;
            if (loaded){
                for (let i = 0; i < loaded.length; i++) {
                    loaded[i].style.fontFamily = 'Courier Prime'
                }
            }
        }
        fontsDefault()
    }, [textsSvg])
    
    //Toggle  
    const handleChange = () => {
        setGameModeBtn(!gameModeBtn)
        mapDefaultColors()
    }

    const resetDefaultGame = () => {
        setScore(0)
        setMissed(0)
        setStatesScored([])
        setStatesMissed([])
        setPreviousQuestions([])
        setCurrentQuestion('')
    }

    //Start animation
    const handleClick = () => {
        // reset 
        mapDefaultColors()
        resetDefaultGame()
        dispatch(resetGame())
        dispatch(startGame()) // Global state true
        nextQuestionQueue() 
    }

    // <----- game logic ------>

    const time = 25
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [statesScored, setStatesScored] =  useState([])
    const [statesMissed, setStatesMissed] =  useState([])
    const [previousQuestions, setPreviousQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState('')

    const mapWithOnlyGreens = React.useCallback((e) => {
        for (let i = 0; i < statesMissed.length; i++) {
            let stateName = statesMissed[i]
            document.querySelector(`[data-name='${stateName}']`).style.fill = "rgb(79, 82, 82)"
        }
    }, [statesMissed])

    const mapDefaultColors = React.useCallback((e) =>{
        if (usMap) {
            for (let i = 0; i < usMap.length; i++) {
                document.getElementById(usMap[i].id).style.fill = "rgb(79, 82, 82)"
            }
        }
    }, [usMap] )
    
    const nextQuestionQueue = React.useCallback((e) => {
        if (usMap) {
            // Clean red map here left only green
            mapWithOnlyGreens()
            let i = Math.floor(Math.random() * (usMap.length - 1))
            let state = usMap[i].dataset.name
            if (!previousQuestions.includes(state)){
                setPreviousQuestions(previousQuestions => [...previousQuestions,state])
                setCurrentQuestion(state)
            } else {
                nextQuestionQueue()
            }
        }
    }, [previousQuestions, usMap, mapWithOnlyGreens])

    const onClickMap =  React.useCallback((e) => { 
        if (usMap && gameOn){
            let clickedState = e.target.dataset.name 
            if (clickedState === previousQuestions[previousQuestions.length - 1]){
                setStatesScored(statesScored => [...statesScored,clickedState])
                e.target.style.fill = 'rgb(0, 131, 28)'
                setScore(score + 1)
                nextQuestionQueue()
            } else {
                setStatesMissed([...statesMissed,clickedState])
                setMissed(missed + 1)
                e.target.style.fill = 'rgb(161, 0, 0)'
            }
        }
    }, [usMap, previousQuestions, score, missed, nextQuestionQueue, gameOn, statesMissed])

    
    useEffect(() => {
        if (score > 0 || missed > 0){
            if (roundComplete && currentId) {
            const saveOnDb = async() => {
                await addNewRound({user: currentId ,time, score, missed, statesScored, statesMissed })
                }
                saveOnDb()
            }
        }
    }, [score, missed, statesScored, statesMissed, roundComplete, addNewRound, currentId, gameOn, username])
    
    const [sendLogout] = useSendLogoutMutation()

    const onLogout = () => {
        sendLogout()
        navigate('/')
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const content = (
        <section className="public">
            <header className="dash-header">
                    <div> <Toggle handleChange={handleChange}/> </div>
                <div className="dash-header__container">
                    <h2><span className="nowrap">Geo-Quiz</span></h2>
                </div>
                    {username ? logoutButton : <div className='settings'>
                        <Link to="/login">LOGIN</Link>
                    </div>}
            </header>

            <main className="public__main">  
                <div  className='game_display_container'>
                    <div className='scoreboard_container' style={!gameModeBtn.checked ? 
                        {visibility: 'visible'} : {visibility: 'hidden'}} >
                        <Scoreboard score={score} missed={missed}/>
                    </div>
                    {!gameModeBtn.checked && 
                        <> 
                            { (!gameOn || roundComplete) ?
                                <ButtonRound handleClick={handleClick} text='START'/> :
                                <div className='round__center'>
                                <ButtonRound handleClick={nextQuestionQueue} text='NEXT'/> 
                                <br/>
                                <br/>
                                <h3>Where is {currentQuestion}?</h3>
                                </div> 
                            } 
                            <div style={{ maxWidth: "120px", marginRight: '30px' }}>
                                <CircularAnimation time={time} />
                            </div>
                        </>
                    }
                </div>

                <div className='main_map_score'>
                         { roundComplete ? <ModalLeft statesScored={statesScored} statesMissed={statesMissed} /> : <div></div>}
                    <div className='map' onMouseMove={addMouseover} onClick={onClickMap}>
                        <SvgUs />
                    </div>
                    <div className='listPrev_container'>
                       { username && <ListPrevRounds username={username}/>}
                    </div>
                </div>
                    { gameModeBtn.checked && <div id="details-box"></div>}
            </main>
            <div className='under__map'>
                <BarChart username={username}/>
            </div>
            <div className='pies'>
                <div className='pie' style={{ maxHeight: "22em"}}>
                    <p style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bolder' }}>STATES BY NUMBER O CORRECT GUESSES</p>
                    <Pie username={username}/>
                </div>
                <div className='pie' style={{ maxHeight: "22em"}}>
                    <p style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bolder' }}>STATES BY NUMBER O MISSED GUESSES</p>
                    <MissedPie username={username}/>
                </div>
            </div>
            <Footer username={username}/>
        </section>

    )
    return content
}
export default Home