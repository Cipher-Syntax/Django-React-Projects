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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[400px] p-[30px] shadow-2xl bg-white rounded-lg">
        <h1 className="text-center font-bold text-3xl mb-5">{status}</h1>
        {error && <p className="text-red-500 text-[14px] mb-2 text-center">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-1 p-[8px] mb-3 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-1 p-[8px] mb-3 rounded-md"
          />
        </div>
        {method === "login" ? (
          <a
            href="/register"
            className="text-[14px] flex items-center justify-center"
          >
            Don't have an account yet?{" "}
            <span className="text-[#333333] font-bold ml-1">Register</span>
          </a>
        ) : (
          <a
            href="/login"
            className="text-[14px] flex items-center justify-center"
          >
            Already have an account?{" "}
            <span className="text-[#333333] font-bold ml-1">Login</span>
          </a>
        )}

        {loading && <LoadingIndicator></LoadingIndicator>}

        <button type='submit' className="bg-[#333333] text-white w-full p-[10px] rounded-md cursor-pointer mt-3" >{status}</button>
      </form>
    </div>
  )
}

export default Form
