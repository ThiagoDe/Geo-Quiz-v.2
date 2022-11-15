import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRoundById } from './roundsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditRoundForm from './EditRoundForm'
import PulseLoader from 'react-spinners/PulseLoader'

const EditRound = () => {
    const { id } = useParams()

    const round = useSelector(state => selectRoundById(state, id))
    const users = useSelector(selectAllUsers)

    const content = round && users ? <EditRoundForm round={round} users={users} /> : <PulseLoader color='green' />

    return content
}
export default EditRound