import React from "react";
// import { render } from "react-dom";
import _ from "lodash"
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { gameFinish, resetGame , roundFinish} from "../../features/roundGame/gameSlice";

const ChangingProgressProvider = forwardRef((props, _ref) => {
    const {values} = props
    
    const [valuesIndex, setValuesIndex] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerId = useRef(0)

    // const [endGame, setEndGame] = useState(false)

    // const roundComplete = useSelector((state) => state.roundComplete.roundComplete)
    const gameOn = useSelector((state) => state.roundComplete.gameOn) 
    const roundComplete = useSelector((state) => state.roundComplete.roundComplete) 
    const dispatch = useDispatch()

    const startTimer = () => {
        timerId.current = setInterval(() => {
                setValuesIndex(prev => prev + 1)
            }, 1000);
        }

    useEffect(() => {
        if (isRunning){
            // setEndGame(false)
            // dispatch(resetGame())
            startTimer()
        } 
    }, [isRunning, dispatch])
    
    const stopTimer = React.useCallback((e)  => {
        // setEndGame(true) 
        clearInterval(timerId.current)
        dispatch(gameFinish())    
        timerId.current = 0
        setValuesIndex(0)
        setIsRunning(false)
    }, [dispatch])

    useEffect(() => { 
        if (gameOn) {
            // console.log(gameOn, 'from circurlar')
            // console.log(roundComplete, 'round from circurlar')
            setIsRunning(true)
        }
        // if (endGame) return 
        
        if (valuesIndex >= values.length) {
            dispatch(roundFinish()) // Global state end game
            stopTimer()
            // dispatch(resetGame()) // reset Global f f
        }
    }, [ valuesIndex, values, dispatch, gameOn, roundComplete, stopTimer])

       

    return ( props.children(Math.round(values[valuesIndex])) )
})


const CircularAnimation = ({time, animationOn}) => {
    
    
    const secondsToPercentages = _.range(time, -1, -1).map(
    seconds => (seconds / time) * 100
    );

    function percentageToSeconds(percentage) {
        
    return String(Math.ceil((percentage / 100) * time));
  }
    
    return (
        <div>
            
            <ChangingProgressProvider values={secondsToPercentages} animationOn={animationOn}>
                {percentage => (
                    <div id='timer__round'>
                        <CircularProgressbar 
                            
                            value={percentage} 
                            text={percentage ? percentageToSeconds(percentage) : '0'} 
                            styles={buildStyles({
                                textSize: '50px',
                                textColor: "#4D5259",
                                pathColor: "#4D5259",
                                trailColor: "ightgray"
                                })}
                        />
                    </div>
                )}
            </ChangingProgressProvider>
        </div>
      
      )
    }
export default CircularAnimation;