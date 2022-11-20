import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        // console.log(decoded, 'decolded')
        const { username, roles, userId } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin, userId }
    }

    return { username: '', roles: [], isManager, isAdmin, status, userId: '1'}
}
export default useAuth