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

const Home = () => {
     const { username, isManager, isAdmin } = useAuth()
     const [currentId, setCurrentId ] = useState(null)

     const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.filter(idx => data?.entities[idx].username === username)
        }),
    })

    useEffect(() => {

        if (users){
            setCurrentId(users[0])
        }
    }, [])
     
    //  console.log(id, 'userparams')
        // const {
        //     data: users,
        //     isLoading,
        //     isSuccess,
        //     isError,
        //     error
            
        // } = useGetUsersQuery('usersList', {
        //     pollingInterval: 6000,
        //     refetchOnFocus: true,
        //     refetchOnMountOrArgChange: true
        // })
    
    
    // useEffect(() => {
    //     if (isSuccess && username) {

    //         const { ids, entities } = users
    //         let userId = ids.filter(id => entities[id].username === username)[0]
            
    //         setCurrentId(userId) 

    //     }
    // }, [ username, users, isSuccess])
    


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
        setUsMap(document.getElementsByTagName('path'))
        if (gameModeBtn.checked) {
            setBoxInfo(document.getElementById('details-box'))
        }
        setGameModeBtn(document.getElementById("checkbox"))
        
    }, [usMap, stateName, stateId, boxInfo, addMouseover, gameModeBtn] );

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

    const time = 5
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [userId, setUserId] = useState(0)
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
            for (let i = 3; i < usMap.length; i++) {
                document.getElementById(usMap[i].id).style.fill = "rgb(79, 82, 82)"
            }
        }
    }, [usMap] )
    
    const nextQuestionQueue = React.useCallback((e) => {
        if (usMap) {
            // Clean red map here left only green
            mapWithOnlyGreens()
            let i = Math.floor(Math.random() * ((usMap.length - 1) - 2 + 1) + 2)
            let state = usMap[i].dataset.name
            console.log(previousQuestions)
            if (!previousQuestions.includes(state)){
                setPreviousQuestions(previousQuestions => [...previousQuestions,state])
                console.log(previousQuestions)
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
        // console.log(gameOn, 'gameon')
        if (score > 0 || missed > 0){
            if (roundComplete) {
            const saveOnDb = async() => {
                // user: "6351a0f72447330ecbcafdd7"
                await addNewRound({user: currentId ,time, score, missed, statesScored, statesMissed })
                }
                saveOnDb()
                // dispatch(resetGame())// reset too early?
            }
        }

    }, [score, missed, statesScored, statesMissed, roundComplete, addNewRound, currentId, gameOn])
    
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
                    <div>  </div>
                <div className="dash-header__container">
                    <h1>Welcome to <span className="nowrap">Geo-Quiz! Home </span></h1>
                </div>
                    {username ? logoutButton : <div className='settings'>
                    <Link to="/login">LOGIN</Link>
                </div>}
            </header>

            <main className="public__main">  
                <div  className='game_display_container'>
                    <Toggle handleChange={handleChange}/>
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

                            <div  style={{ width: "100px" }}>
                                <CircularAnimation time={time} />
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
                    <div>
                       { username && <ListPrevRounds/>}
                    </div>
                </div>
                    { gameModeBtn.checked && <div id="details-box"></div>}
            </main>
            <div className='under__map'></div>
            <footer>
                <div className='settings'>
                    { username && <Link to="/dash">Dash</Link>}
                </div>
            </footer>
        </section>

    )
    return content
}
export default Home