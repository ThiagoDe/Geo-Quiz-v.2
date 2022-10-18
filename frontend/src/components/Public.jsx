import { Link } from 'react-router-dom'
import SvgUs from './Us'
import React, { useState, useEffect } from 'react'

const Public = () => {
    // const [gameModeBtn, setGameModeBtn] = useState(false)
    const [usMap, setUsMap] = useState(null)
    const [stateName, setStateName ] = useState('')
    const [stateId, setStateId] = useState('')
    const [boxInfo, setBoxInfo] = useState('none')
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [uniqState, setUniqState] = useState(null)

    const addMouseover = React.useCallback((e) => {

                    if (e.target.tagName === 'path') {
                        
                        setStateName(e.target.dataset.name)
                        setStateId(e.target.dataset.id)
                    }
                 
                })
    
    const addMouseout = React.useCallback(() => {
        // e.stopPropagation()
        console.log('mouseout')
        boxInfo.style.opacity = "0%"
    })

    const windowMouse = () => {
        window.onmousemove = function (e) {  
                setUniqState(e.target)
                setX(e.clientX)
                setY(e.clientY)  
                boxInfo.style.display = "block";
                boxInfo.innerHTML = stateName + " " + stateId;
                boxInfo.style.opacity = "100%";            
                boxInfo.style.top = (y + 25) + 'px';
                boxInfo.style.left = (x) + 'px';
            };
    }

    useEffect (() => {
        setUsMap(document.getElementsByTagName('path'))
        setBoxInfo(document.getElementById('details-box'))

        
        if (uniqState) {
            console.log(uniqState, 'test in')
            uniqState.addEventListener('mouseover', addMouseover)
            uniqState.addEventListener('mouseout',addMouseout)

        }
        window.onmousemove = function (e) {  
                setUniqState(e.target)
                setX(e.clientX)
                setY(e.clientY)  
                boxInfo.style.display = "block";
                boxInfo.innerHTML = stateName + " " + stateId;
                boxInfo.style.opacity = "100%";            
                boxInfo.style.top = (y + 25) + 'px';
                boxInfo.style.left = (x) + 'px';
            };
        
    }, [x, y, usMap, stateName, stateId, boxInfo, uniqState, addMouseout, addMouseover] );
    
    
 

    
    


    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Geo-Quiz!</span></h1>
            </header>
            <main className="public__main">

                <div id="details-box"></div>
                <div onMouseEnter={addMouseover} onMouseLeave={addMouseout}>
                    <SvgUs />
                </div>
                
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public