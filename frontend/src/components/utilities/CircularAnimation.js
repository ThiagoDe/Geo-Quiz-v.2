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

const ChangingProgressProvider = forwardRef((props, _ref) => {
    const {values, animationOn} = props
    
    const [valuesIndex, setValuesIndex] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerId = useRef(0)

    const [renderTimes, setRenderTimes] = useState(0)
    const [endGame, setEndGame] = useState(false)

    const [stoper, setStoper] = useState('')

    useImperativeHandle(_ref, () => ({
        isEndGame: () => {
            return endGame
        }
    }))
    useEffect(() => {
        setStoper(document.getElementsByClassName('nowrap')[0].innerHTML)
        console.log(stoper)
    }, [stoper])

    const startTimer = () => {
        timerId.current = setInterval(() => {
                setValuesIndex(prev => prev + 1)
            }, 1000);
        }

    useEffect(() => {
        if (isRunning){
            setEndGame(false)
            startTimer()
        } 
    }, [isRunning])

    useEffect(() => {
        
        if (renderTimes < animationOn){
            setIsRunning(true)
            setRenderTimes(animationOn)
        }
        if (endGame) return 
      
        if (valuesIndex >= values.length) {
            document.getElementsByClassName('nowrap')[0].innerHTML = 'stop'
            stopTimer()
        }
    }, [ valuesIndex, animationOn, renderTimes, isRunning,values, endGame])

       


    const stopTimer = () => {
        setEndGame(true)
        
        clearInterval(timerId.current)
        timerId.current = 0
        setValuesIndex(0)
        setIsRunning(false)
    }


    return ( props.children(Math.round(values[valuesIndex])) )
})


const CircularAnimation = ({time, animationOn}) => {
    const testRef = useRef()
    // const [end, setEnd] = useState()

    // useEffect(() => {
    //     if (!testRef.current.isEndGame()){
    //         return
    //     } else {
    //         return 
    //     }
    // }, [])
   
    // useEffect(() => {
    //     console.log(testRef.current.isEndGame())
    //     if (!testRef.current.isEndGame()){
    //         console.log(testRef.current.isEndGame())
    //     } else {
    //         console.log(testRef.current.isEndGame())

    //     }

    // }, []
    
    const secondsToPercentages = _.range(time, -1, -1).map(
    seconds => (seconds / time) * 100
    );

    function percentageToSeconds(percentage) {
        
    return String(Math.ceil((percentage / 100) * time));
  }
    
    return (
        <div>
            
            <ChangingProgressProvider ref={testRef} values={secondsToPercentages} animationOn={animationOn}>
                {percentage => (
                    <div id='timer__round'>
                        <CircularProgressbar 
                            
                            value={percentage} 
                            text={percentageToSeconds(percentage)} 
                            styles={buildStyles({
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