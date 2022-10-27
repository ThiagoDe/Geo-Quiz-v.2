import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewRoundMutation } from "./roundsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewRoundForm = ({ users }) => {

    const [addNewRound, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewRoundMutation()

    const navigate = useNavigate()

    const [time, setTime] = useState(15)
    const [score, setScore] = useState(0)
    const [missed, setMissed] = useState(0)
    const [userId, setUserId] = useState(users[0].id)
    
    useEffect(() => {
        if (isSuccess) {
            setTime('')
            setScore('')
            setMissed('')
            setUserId('')
            navigate('/dash/rounds')
        }
        
    }, [isSuccess, navigate, users])
    useEffect(() => {
        setTime(15)
        setScore(1)
        setMissed(0)
        setUserId(users[0].id)
        
    }, [setTime, setScore, setMissed, setUserId, users])
    
    const canSave = [time, score, missed, userId].every(Boolean) && !isLoading
    const onTimeChanged = e => setTime(e.target.value)
    const onScoreChanged = e => setScore(e.target.value)
    const onMissedChanged = e => setMissed(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)


    const onSaveRoundClicked = async (e) => {
        e.preventDefault()
        // if (canSave) {
        await addNewRound({ user: userId, time, score, missed })
        // }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTimeClass = !time ? "form__input--incomplete" : ''
    const validScoreClass = !score ? "form__input--incomplete" : ''
    const validMissedClass = !missed ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveRoundClicked}>
                <div className="form__time-row">
                    <h2>New Round</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            time="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="time">
                    Time:</label>
                <input
                    className={`form__input ${validTimeClass}`}
                    id="time"
                    name="time"
                    type="score"
                    autoComplete="off"
                    value={time}
                    onChange={onTimeChanged}
                />

                <label className="form__label" htmlFor="time">
                    Score:</label>
                <input
                    className={`form__input ${validScoreClass}`}
                    id="score"
                    name="score"
                    type="score"
                    autoComplete="off"
                    value={score}
                    onChange={onScoreChanged}
                />

                <label className="form__label" htmlFor="score">
                    Missed:</label>
                <input
                    className={`form__input ${validMissedClass}`}
                    id="missed"
                    name="missed"
                    type="score"
                    autoComplete="off"
                    value={missed}
                    onChange={onMissedChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewRoundForm