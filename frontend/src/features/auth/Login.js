import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import NewUserForm from '../users/NewUserForm'

import usePersist from '../../hooks/usePersist'
import PulseLoader from 'react-spinners/PulseLoader'

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const [newUserForm, setNewUserForm] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
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

    const handleDemoSubmit = async (e) => {
        e.preventDefault()
        try {
            const username = 'UserDemo'
            const password = 'password'
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

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <div className="pulse"><PulseLoader color='green' /></div>

    const content = (
        <section className="public">
            <div style={!newUserForm ? {display: 'none'}: {display: 'block'}}>
                <NewUserForm/>
                <br/>
                <hr/>
                <br/>
                <div className='create_account'>
                    <div className='h7' onClick={() => setNewUserForm(!newUserForm)} style={{cursor: 'pointer'}}>Already have an Account? </div>
                </div>
            </div>
            <div className='login_container' style={newUserForm ? {display: 'none'}: {display: 'block'}}>
                    <>
                    <header>
                        <FontAwesomeIcon icon={faUserCircle} style={{fontSize:"110px"}}/>
                    </header>
                    <main className="login">
                        
                        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                        <form className="form" onSubmit={handleSubmit}>
                            <input
                                placeholder='Username'
                                className="form__input"
                                type="text"
                                id="username_login"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />

                            <input
                                placeholder="Password"
                                className="form__input"
                                type="password"
                                id="password_login"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                            <label htmlFor="persist" className="form__persist">
                                <input
                                    type="checkbox"
                                    className="form__checkbox"
                                    id="persist_login"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                <div className='h8' >Trust this device</div>
                            </label>
                            <button className="form__submit-button">Sign In</button>

                            <div className='h9'><span>Or sign in as a guest</span></div>
                            <div className="form" onClick={handleDemoSubmit}>
                                <button className="form__submit-button" style={{background: '#2196F3', color:'white' }}  >Guest Sign In </button>
                            </div>

                        </form>
                        
                    </main>
                        <br/>
                        <div className='create_account'>
                            <div className='h7' onClick={() => setNewUserForm(!newUserForm)} style={{cursor: 'pointer'}}>Create Your Account </div>
                        </div>
                        </>
                    </div>
        </section>
    )

     
     return content 
    
}
export default Login