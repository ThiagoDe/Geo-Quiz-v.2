import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectTurnById } from './turnsApiSlice'

const Turn = ({ turnId }) => {

    const turn = useSelector(state => selectTurnById(state, turnId))
    console.log(turnId, 'Turn.js')
    const navigate = useNavigate()

    if (turn) {
        const created = new Date(turn.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(turn.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/turns/${turnId}`)

        return (
                <tr className="table__row user">
                    <td className={`table__cell--inactive`}>{turn.username}</td>
                    <td className={`table__cell--inactive`}>{turn.score}</td>
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
export default Turn