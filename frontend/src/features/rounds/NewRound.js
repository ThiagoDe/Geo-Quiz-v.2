import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewRoundForm from './NewRoundForm'

const NewRound = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewRoundForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewRound