import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
// import useTitle from '../../hooks/useTitle'

const EditUser = () => {
    const { id } = useParams()
    // console.log(id, 'form editUser')
    // console.log(id, 'from EditUser')
    // const user = useSelector(state => selectUserById(state, id))
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser