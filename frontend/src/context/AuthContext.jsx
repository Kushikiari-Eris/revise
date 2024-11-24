import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../pages/utils/AxiosInstance'
import { BASE_URL } from '..//pages/utils/Constant';

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined)
    const [role, setRole] = useState(null)
    const [username, setUsername] = useState(null)
    const [loading, setLoading] = useState(true)  // Add loading state

    const getLoggedIn = async () => {
        try {
            const loggedInRes = await axiosInstance.get(`${BASE_URL}/user/loggedIn`)
            setLoggedIn(loggedInRes.data.loggedIn)
            setRole(loggedInRes.data.role)
            setUsername(loggedInRes.data.username)
        } catch (error) {
            console.error("Error fetching logged-in status:", error)
            setLoggedIn(false)  // If there's an error, consider the user not logged in
            setRole(null)
            setUsername(null)
        } finally {
            setLoading(false)  // Set loading to false once the request is complete
        }
    }

    useEffect(() => {
        getLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, role, username, loading, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthContextProvider }