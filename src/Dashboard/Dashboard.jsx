import React from 'react'
import { useAuthDispatch, logout, useAuthState } from '../Context'

function Dashboard(props) {
    const dispatch = useAuthDispatch()
    const userDetails = useAuthState()

    console.log(userDetails)

    const handleLogout = () => {
        logout(dispatch)
        console.log(userDetails)
        props.history.push('/login')
    }
    return (
        <div style={{ padding: 10 }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} onClick={handleLogout}>
                <h1>
                    Dashboard
                </h1>
                <button style={{ height: '30px', width: '100px' }}>Logout</button>
            </div>
            <p>Welcome {userDetails.user.username}</p>
        </div>
    )
}

export default Dashboard
