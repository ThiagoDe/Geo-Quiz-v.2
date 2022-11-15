// import { useSelector } from 'react-redux'
// import { selectAllUsers } from '../users/usersApiSlice'
import NewRoundForm from './NewRoundForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
// import useTitle from '../../hooks/useTitle'

const NewRound = () => {
    // const users = useSelector(selectAllUsers)
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color='green' />

    const content = <NewRoundForm users={users} />

    return content
}
export default NewRound