// // import { useState, useEffect, useDebugValue, useDeferredValue } from "react"
// import { useAddNewTurnMutation } from '../turns/turnsApiSlice'

// // const userDefault = {
// //     username: 'userDefault',
// //     password: 'password',
// //     roles: ['User'],
// // }

// const newTurnGame = () => {

//     const [addNewTurn, {
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useAddNewTurnMutation()

//     const onStartTurnClicked = async (e) => {
//         e.preventDefault()
//         // if (canSave) {
//         await addNewTurn({ user: 1, 
//             time: 15,
//             score: 0, 
//             missed: 0,
//             statesScored: [],
//             statesMissed: []
        
//         })
//         // }
//     }
    // const [time, setTime] = useState(15)
    // const [score, setScore] = useState(0)
    // const [missed, setMissed] = useState(0)
    // const [userId, setUserId] = useState(userDefault)
    // const [statesScored, setStatesScored] = useState([])
    // const [statesMissed, setStatesMissed] = useState([])

    // useEffect(() => {
    //     if (isSuccess) {
    //         setTime('')
    //         setScore('')
    //         setMissed('')
    //         setUserId('')
    //         setStatesScored('')
    //         setStatesMissed('')
    //     }
        
    // }, [isSuccess])

    // useEffect(() => {
    //     setTime(15)
    //     setScore(0)
    //     setMissed(0)
    //     setUserId(userDefault)
    //     setStatesScored([])
    //     setStatesMissed([])
        
    // }, [setTime, setScore, setMissed, setUserId, setStatesMissed, setStatesScored])


// }

// export default newTurnGame