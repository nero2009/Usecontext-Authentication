import React from 'react'
import { useAuthDispatch, logout, useAuthState } from '../Context'
import styles from './Dashboard.module.css'

function Dashboard(props) {
    const dispatch = useAuthDispatch()
    const userDetails = useAuthState()


    const handleLogout = () => {
        logout(dispatch)
        console.log(userDetails)
        props.history.push('/login')
    }
    return (
        <div style={{ padding: 10 }}>
            <div style={styles.dashboardPage} >
                <h1>
                    Dashboard
                </h1>
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
            <p>Welcome {userDetails.user.username}</p>
        </div>
    )
}

export default Dashboard
