import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import api from  '../api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));

        const timer = setTimeout(() => {
            if(isAuthorized === null){
                setIsAuthorized(false);
            }
        }, 3000)

        return () => clearTimeout(timer);
    }, [isAuthorized])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            const response = await api.post("api/token/refresh/", {
                refresh: refreshToken
            })

            if(response.status === 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.error("Failed to refresh token: ", error)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }


    if(isAuthorized == null){
        return (
            <div className='flex flex-col text-center items-center justify-center min-h-screen'>
                <h1 className='text-3xl font-bold'>Loading...</h1>
                <LoadingIndicator></LoadingIndicator>
            </div>
        )
        
    }
    return isAuthorized ? children : <Navigate to="/login" replace></Navigate> 


}

export default ProtectedRoute