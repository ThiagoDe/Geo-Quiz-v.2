import './modalLeft.css'
import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';

const ModalLeft = ({statesMissed, statesScored}) => {

    const gameOn = useSelector((state) => state.roundComplete.gameOn) 
    const roundComplete = useSelector((state) => state.roundComplete.roundComplete)
    // console.log(gameOn)
    // console.log(roundComplete)
    
    const [open, setOpen] = useState(true);
    const setMissed = new Set(statesMissed)
    const setScored = new Set(statesScored)
    // console.log([...setMissed])
    // console.log(setScored)

    useEffect(() => {
        if (!gameOn && roundComplete){
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [gameOn, roundComplete])

    const listItemsScored = [...setScored].map( (e, i) => 
      <li className = 'dropdownItem' key={i}>
          {e + ' ✅'  }
      </li>

    )
    const listItemsMissed = [...setMissed].map( (e, i) => 
      <li className = 'dropdownItem' key={i}>
          {e + ' ❌'}
      </li>

    )
    // console.log(listItemsScored, 'list')
    return (
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
            {/* <p style={{color: 'green'}}>RIGHT</p> */}
            <ul>{listItemsScored}
            </ul>
            {/* <p style={{color: 'red'}} >MISSED</p> */}
            <ul>{listItemsMissed}
            </ul>
        </div>
    )
}



export default ModalLeft 