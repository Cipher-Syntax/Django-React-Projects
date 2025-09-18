import React, { useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import { LoadingIndicator } from '../components'

const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const status = method == "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try{
            const response = await api.post(route, { username, password })

            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN,  response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                localStorage.setItem('username', username)
                navigate('/')
            }
            else{
                navigate('/login')
            }
        }
        catch(error){
            if(error.response){
                if(error.response.status === 401){
                    const errorDetail = error.response.data.detail

                    if(errorDetail === "No active account found with the given credentials"){
                        setError('Invalid username or password')
                    }
                    else{
                        console.log(errorDetail)
                    }
                }
                else if(error.response.status === 400){
                    if(error.response.data.username){
                        setError(error.response.data.username[0])
                    }
                    else{
                        setError('Something went wrong')
                    }
                }
                else{
                    setError('Network error. Please try again')
                }
            }
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-[500px] mx-auto flex items-center justify-center p-[20px]'>
            <form className='w-full border p-[20px]' onSubmit={handleSubmit}>
                <h1 className='text-center text-3xl font-bold'>{status}</h1>

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
                { loading && <LoadingIndicator></LoadingIndicator>}

                <button type="submit" className="bg-[#00fd9a] text-black font-bold w-full py-3 rounded-md cursor-pointer mt-3 hover:bg-black hover:text-[#00fd9a] transition-colors">{status}</button>
                
            </form>
        </div>
    )

}

export default Form