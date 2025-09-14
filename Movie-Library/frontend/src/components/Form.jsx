import React, { useState } from 'react'
import api from "../api/api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { LoadingIndicator } from "../components"

const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const status = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try{
            const response = await api.post(route, { username, password })

            if (method !== "login"){
                navigate('/login')
            }
            
            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            navigate("/")
        }
        catch(error){
            if (error.response){
                if (error.response.status === 400){
                    const errorDetail = error.response.detail
                    if (errorDetail === "No active account found with the given credentials"){
                        setError("Invalid username or password")
                    }
                    else{
                        console.error(errorDetail);
                    }
                }
                else if (error.response.status === 401){
                    if (error.response.username){
                        setError(error.response.data.username[0])
                    }
                    else{
                        setError("Invalid input. Check username and password")
                    }
                }
                else{
                    setError("Something went wrong")
                }
            }
            else{
                setError("Network error. Please check your connection")
            }
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-[400px] p-[30px] shadow-2xl bg-white rounded-lg">
                <h1 className="text-center font-bold text-3xl mb-5">{status}</h1>
                { error && <p className="text-red-500 text-[14px] mb-2 text-center">{error}</p>}

                <div className='flex flex-col gap-1'>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className="outline-1 p-[8px] mb-3 rounded-md"/>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="outline-1 p-[8px] mb-3 rounded-md"/>
                </div>

                {
                    method === "login" ? (
                        <a href="/register" className="text-[14px] flex items-center justify-center">Don't have an account yet? {" "} <span className="text-[#333333] font-bold ml-1 hover:underline">Register</span></a>
                    ) : (
                        <a href="/login" className="text-[14px] flex items-center justify-center">Already have an account? {" "} <span className="text-[#333333] font-bold ml-1 hover:underline">Login</span></a>
                    )
                }

                {loading && <LoadingIndicator></LoadingIndicator>}

                <button type='submit' className="bg-[#333333] text-white w-full p-[10px] rounded-md cursor-pointer mt-3">{status}</button>
                
            </form>
        </div>
    )
}

export default Form