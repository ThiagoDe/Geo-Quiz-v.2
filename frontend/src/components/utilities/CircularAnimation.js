import React from "react";
// import { render } from "react-dom";
import _ from "lodash"
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useEffect, useState, useRef } from 'react'

const ChangingProgressProvider = (props) => {
    const {values, animationOn} = props
    
    const [valuesIndex, setValuesIndex] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerId = useRef(0)

    const [renderTimes, setRenderTimes] = useState(0)

    const startTimer = () => {
        timerId.current = setInterval(() => {
                setValuesIndex(prev => prev + 1)
            }, 1000);
        }

    useEffect(() => {
        if (renderTimes < animationOn){
            setIsRunning(true)
            setRenderTimes(animationOn)
        }
        // console.log(isRunning)
        // console.log(animationOn, 'AnimationOn number')
        if (valuesIndex >= values.length) stopTimer()
    }, [ valuesIndex, animationOn, renderTimes, isRunning,values])

       
    useEffect(() => {
        if (isRunning){
            startTimer()
        }
    }, [isRunning])

    const stopTimer = () => {
        clearInterval(timerId.current)
        timerId.current = 0
        setValuesIndex(0)
        setIsRunning(false)
    }


    return ( props.children(Math.round(values[valuesIndex])) )
}


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
                    <CircularProgressbar 
                        
                        value={percentage} 
                        text={percentageToSeconds(percentage)} 
                        styles={buildStyles({
                            textColor: "#4D5259",
                            pathColor: "#4D5259",
                            trailColor: "ightgray"
                            })}
                    />
                    )}
            </ChangingProgressProvider>
        </div>
      
      )
    }
export default CircularAnimation;