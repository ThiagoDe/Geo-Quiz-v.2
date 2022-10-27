import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectRoundById } from './roundsApiSlice'

const Round = ({ roundId }) => {

    const round = useSelector(state => selectRoundById(state, roundId))
    console.log(roundId, 'Round.js')
    const navigate = useNavigate()

    if (round) {
        const created = new Date(round.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(round.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/rounds/${roundId}`)

        return (
                <tr className="table__row user">
                    <td className={`table__cell--inactive`}>{round.username}</td>
                    <td className={`table__cell--inactive`}>{round.statesScored}</td>
                    <td className={`table__cell--inactive`}>{round.statesMissed}</td>
                    <td className={`table__cell--inactive`}>{round.score}</td>
                    <td className={`table__cell--inactive`}>{created}</td>
                    <td className={`table__cell--inactive`}>
                        <button
                            className="icon-button table__button"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
        )

    } else return null
}
export default Round