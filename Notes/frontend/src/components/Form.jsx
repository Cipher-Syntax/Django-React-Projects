import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'

const Form = ({route, method}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const status = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try{
            const response = await api.post(route, {username, password})

            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate('/')
            }
            else{
                navigate('/login');
            }

        }
        catch(err){
            if (err.response) {
                if (err.response.status === 401) {
                    const errorDetail = err.response.data.detail;
                    if (errorDetail === "No active account found with the given credentials") {
                        setError("Invalid username or password.");
                    } else {
                        alert(errorDetail);
                    }
                } 
                else if (err.response.status === 400) {
                    if (err.response.data.username) {
                        setError(err.response.data.username[0]);
                    } else {
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


        finally{
            setLoading(false)
        }


    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-[20px] rounded-md shadow-2xl max-w-[400px] w-full'>
                <h1 className='font-bold text-3xl mt-2 mb-10'>{status}</h1>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-[90%] p-[10px] my-[10px] mx-0 border-[#ccc] rounded-md box-border border-1' />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[90%] p-[10px] my-[10px] mx-0 border-[#ccc] rounded-md box-border border-1' />
                {method === "login" ? <a href='/register'>Don't have an account yet? <span className='text-[#007bff]'>Register</span></a> : <a href='/login'>Already have an account? <span className='text-[#007bff]'>Login</span></a>}
                {loading && <LoadingIndicator />}
                <button className='w-[95%] p-[10px] my-[20px] mx-0 bg-[#007bff] text-white border-0 rounded-[4px] cursor-pointer ease-in-out duration[2s] hover:bg-[#0056b3]' type='submit'>{status}</button>
            </form>
        </div>

    )
}

export default Form