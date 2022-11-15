import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/
const ROUNDS_REGEX = /^\/dash\/rounds(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin, username} = useAuth

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewRoundClicked = () => navigate('/dash/rounds/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onRoundsClicked = () => navigate('/dash/rounds')
    const onUsersClicked = () => navigate('/dash/users')

    if (isLoading) return <PulseLoader color='green' />

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !ROUNDS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newRoundButton = null
    if (ROUNDS_REGEX.test(pathname)) {
        newRoundButton = (
            <button
                className="icon-button"
                title="New round"
                onClick={onNewRoundClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let roundsButton = null
    if (!ROUNDS_REGEX.test(pathname) && pathname.includes('/dash')) {
        roundsButton = (
            <button
                className="icon-button"
                title="Rounds"
                onClick={onRoundsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }
    
    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )
    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newRoundButton}
                {newUserButton}
                {roundsButton}
                {userButton}
                
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/">
                        <h1 className="dash-header__title">Geo Quiz </h1>
                    </Link>
                    <nav className="dash-header__nav">
                    </nav>
                        {buttonContent}
                    <nav className="settings" >
                        {/* add more buttons later */}
                        {logoutButton}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader