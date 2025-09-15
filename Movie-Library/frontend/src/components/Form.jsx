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

        try {
            const response = await api.post(route, { username, password })

            if (method !== "login") {
                navigate('/login')
            }

            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            localStorage.setItem('username', username)
            navigate("/")
        } 
        catch(error){
            if (error.response) {
                if (error.response.status === 401) {
                    const errorDetail = error.response.data.detail;
                    if (errorDetail === "No active account found with the given credentials") {
                        setError("Invalid username or password.");
                    } 
                    else {
                        alert(errorDetail);
                    }
                } 
                else if (error.response.status === 400) {
                    if (error.response.data.username) {
                        setError(error.response.data.username[0]);
                    } 
                    else {
                        setError("Invalid input. Check your username and password.")
                    }
                } 
                else {
                    setError("Something went wrong.");
                }
            } else {
                setError("Network error. Please check your connection.");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000300] px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
                <h1 className="text-center font-bold text-3xl mb-6 text-black">{status}</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>
                )}

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="username" className="text-black font-semibold">Username</label>
                    <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00fd9a] transition text-black"/>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="text-black font-semibold">Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00fd9a] transition text-black"/>
                </div>

                {
                    method === "login" ? (
                        <p className="text-sm text-center mb-4 text-black">Don’t have an account?{" "}
                            <a href="/register" className="text-[#00fd9a] font-bold hover:underline">Register</a>
                        </p>
                    ) : (
                        <p className="text-sm text-center mb-4 text-black">Already have an account?{" "}
                            <a href="/login" className="text-[#00fd9a] font-bold hover:underline">Login</a>
                        </p>
                    )
                }

                {loading && <LoadingIndicator />}

                <button type="submit" className="bg-[#00fd9a] text-black font-bold w-full py-3 rounded-md cursor-pointer mt-3 hover:bg-black hover:text-[#00fd9a] transition-colors">{status}</button>
            </form>
        </div>
    )
}

export default Form
