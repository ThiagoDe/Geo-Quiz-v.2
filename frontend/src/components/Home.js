import { Link } from 'react-router-dom'
import SvgUs from './Us'
import Toggle from './utilities/Toggle'
import React, { useState, useEffect, useRef } from 'react'
import ButtonRound from './utilities/ButtonRound'
import CircularAnimation from './utilities/CircularAnimation'
import { useAddNewRoundMutation } from '../features/rounds/roundsApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import Scoreboard from './utilities/Scoreboard'
import { gameFinish, resetGame, startGame } from "../features/roundGame/gameSlice";
import ListPrevRounds from './utilities/ListPrevRounds'
import useAuth from '../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { useGetUsersQuery} from '../features/users/usersApiSlice'
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

    // console.log(userId, 'auth here')
     
     
    // const { users } = useGetUsersQuery("usersList", {
    //     pollingInterval: 6000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true,
    //     selectFromResult: ({ data }) => ({
    //     users: data?.ids.filter(idx => data?.entities[idx].username === username)
    //     }),
    //     })
 
    
    // useEffect(() => {
    //     if (username && users){
    //         setCurrentId(users[0])
    //         // window.localStorage.setItem('userId', JSON.stringify(users[0]))
    //         window.localStorage.setItem('userId', users[0])
    //         console.log(currentId, 'current Id inside if')
    //     }
    // }, [username])

    
    // useEffect(() => {
    //     const d = window.localStorage.getItem('userId') 
    //     console.log(d, 'data')
    //     // if (d !== null && d !== 'undefined') setCurrentId(JSON.parse(d))
    //     if (d !== null && d !== undefined) setCurrentId(d)
    // }, [])

    // useEffect(() => {
        
    //      if (currentId !== null && currentId !== undefined) window.localStorage.setItem('userId', currentId)
    // }, [currentId])

    const [addNewRound, 
        // isLoading,
        // isSuccess,
        // isError,
        // error
   ] = useAddNewRoundMutation()

    const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState(null)
    const [pos, setPos] = useState({x: 0, y: 0})
    const dispatch = useDispatch()

    const roundComplete = useSelector((state) => state.roundComplete.roundComplete)
    const gameOn = useSelector((state) => state.roundComplete.gameOn) 

    // const [firstRound, setFirstRound] = useState(true)

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
        // console.log(usMap)
        if (gameModeBtn.checked) {
            setBoxInfo(document.getElementById('details-box'))
        }
        setGameModeBtn(document.getElementById("checkbox"))
        
    }, [usMap, stateName, stateId, boxInfo, addMouseover, gameModeBtn] );

    const [defsSvg, setDefsSvg] = useState()
    useEffect(() => {
        setDefsSvg(document.getElementsByTagName('defs'))
        // console.log(defsSvg)
    }, [defsSvg])

    useEffect(() => {
        if (defsSvg) {
            for (let i = 0; i < defsSvg.length; i++) {
                defsSvg[i].style = "@import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap')"
                defsSvg[i].style.fontFamily = 'Courier Prime'
                // console.log(defsSvg[i])
            }
        }
    }, [defsSvg])

    const [textsSvg, setTextsSvg] = useState()
    useEffect(() => {
        setTextsSvg(document.getElementsByTagName('text'))
        // console.log(textsSvg)
    }, [textsSvg])
    

    if (textsSvg) {
        for (let i = 0; i < textsSvg.length; i++) {
            textsSvg[i].style.fontFamily = 'Courier Prime'
        }
    }

    const fontsDefault = async() => {
        let loaded = await textsSvg;
        if (loaded){
            for (let i = 0; i < loaded.length; i++) {
                loaded[i].style.fontFamily = 'Courier Prime'
            }
        }
    }
    
    fontsDefault()
    
  
    // useEffect(() => {
    //     let c = document.getElementsByTagName('canvas')
    //     c[0].getContext('2d').font = '30px Courier New'
    //     c[0].style.fontFamily = '30px Courier New'
    //     console.log(c[0].getContext('2d')) 
    // }, [])



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
            // console.log(previousQuestions)
            if (!previousQuestions.includes(state)){
                setPreviousQuestions(previousQuestions => [...previousQuestions,state])
                // console.log(previousQuestions)
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
        console.log(currentId, 'save')
        if (score > 0 || missed > 0){
            if (roundComplete && currentId) {
            const saveOnDb = async() => {
                await addNewRound({user: currentId ,time, score, missed, statesScored, statesMissed })
                }
                saveOnDb()
            }
        }

    }, [score, missed, statesScored, statesMissed, roundComplete, addNewRound, currentId, gameOn, username])
    
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const navigate = useNavigate()
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

                            <div  style={{ maxWidth: "120px", marginRight: '30px' }}>
                                <CircularAnimation time={time} />
                            </div>
                        </>
                    }
                </div>

                <div className='main_map_score'>
                    {/* <div></div> */}
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