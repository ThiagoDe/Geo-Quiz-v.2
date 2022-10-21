import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTurnById } from './turnsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditTurnForm from './EditTurnForm'

const EditTurn = () => {
    const { id } = useParams()

    const turn = useSelector(state => selectTurnById(state, id))
    const users = useSelector(selectAllUsers)

    const content = turn && users ? <EditTurnForm turn={turn} users={users} /> : <p>Loading...</p>

    return content
}
export default EditTurn