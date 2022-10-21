import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTurnForm from './NewTurnForm'

const NewTurn = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewTurnForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewTurn