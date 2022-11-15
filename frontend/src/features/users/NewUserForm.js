import { useRef, useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { useLoginMutation } from "../auth/authApiSlice"
import { setCredentials } from "../auth/authSlice"
import { useDispatch } from "react-redux"
import usePersist from "../../hooks/usePersist"
import PulseLoader from 'react-spinners/PulseLoader'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-z0-9!]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const errRef = useRef()
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // aliases isLoading as loading
    const [login, { isLoading: loading }] = useLoginMutation()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["User"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            // navigate('/dash/users')
            // navigate('/user')
        }
    }, [isSuccess, navigate])

    const handleSubmit = async (e) => {
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/user')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [validUsername, validPassword, roles.length].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles})
            handleSubmit()

        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    if (loading) return <PulseLoader color='green' />

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="login_container">
                    {/* <h2>New User</h2> */}
                     <header>
                        <FontAwesomeIcon icon={faUserCircle} style={{fontSize:"110px"}}/>
                        {/* {isLoading && <div className="pulse"><PulseLoader color='green' /></div>} */}
                    </header>
                    <br/>
                    <div className='h9'><span>Create your account</span></div>
                    <br/>
                    <div className="form__action-buttons">
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    <span className="nowrap">[3-20 letters]</span></label>
                <input
                    placeholder='Username'
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                     <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    placeholder="Password"
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                <button className="form__submit-button" style={{background: '#2196F3', color:'white' }}>Sign Up</button>

                {/* <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="2"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select> */}

            </form>
        </>
    )

    return content
}
export default NewUserForm