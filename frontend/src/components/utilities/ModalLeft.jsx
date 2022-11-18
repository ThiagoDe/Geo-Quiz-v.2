import './modalLeft.css'
import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';

const ModalLeft = ({statesMissed, statesScored}) => {

    const gameOn = useSelector((state) => state.roundComplete.gameOn) 
    const roundComplete = useSelector((state) => state.roundComplete.roundComplete)
    // console.log(gameOn)
    // console.log(roundComplete)
    
    const [open, setOpen] = useState(false);
    const setMissed = new Set(statesMissed)
    const setScored = new Set(statesScored)
    // console.log([...setMissed])
    // console.log(setScored)

    useEffect(() => {
        if (!gameOn && roundComplete){
            setOpen(false)
        } else {
            setOpen(true)
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

    useEffect(() => {
        if (listItemsMissed.length === 0 && listItemsScored.length === 0) setOpen(true)
    }, [listItemsMissed, listItemsScored])

        const content = (
            <div className={`dropdown-menu ${!open? 'active' : 'inactive'}`} >
                <ul>{listItemsScored}
                </ul>
                <ul>{listItemsMissed}
                </ul>
            </div>
        )
        return content
    }



export default ModalLeft 