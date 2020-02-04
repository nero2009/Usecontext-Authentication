import React, { useState, useContext } from 'react'

import { loginUser, useAuthState, useAuthDispatch } from '../Context'

function Login(props) {

    const dispatch = useAuthDispatch()
    const { loading, errorMessage } = useAuthState()
    console.log('lout', loading)


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            let response = await loginUser(dispatch, { username, password })
            if (!response) return
            props.history.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    console.log('lout', { loading, errorMessage })


    return (
        <div style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 200 }}>
                <h1>Login Page</h1>
                {
                    errorMessage ? <p style={{ fontSize: '0.8rem', color: '#bb0000' }}>{errorMessage}</p> : null
                }
                <form >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                        </div>
                    </div>
                    <button onClick={handleLogin} >login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
