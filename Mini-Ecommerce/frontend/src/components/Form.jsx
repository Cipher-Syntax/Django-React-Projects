import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import api from "../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";

const Form = ({ route, method }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const status = method === "login" ? "Login" : "Register";

    useEffect(() => {
        if (error){
            const timer = setTimeout(() => setTimeout(() => setError("")), 2000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const onSubmit = async (data) => {
        try {
            const response = await api.post(route, data);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                localStorage.setItem("username", data.username);
                navigate("/");
            } 
            else {
                navigate("/login");
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    const errorDetail = error.response.data.detail;
                    if (errorDetail === "No active account found with the given credentials") {
                        setError("Invalid username or password");
                    } else {
                        console.log(errorDetail);
                    }
                    } else if (error.response.status === 400) {
                    if (error.response.data.username) {
                        setError(error.response.data.username[0]);
                    } else {
                        setError("Something went wrong");
                    }
                    } else {
                    setError("Network error. Please try again later");
                    }
                }
            } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">

            {/* Left Side - Blue Gradient */}
            <div className="w-full md:w-[65%] bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-8 md:p-16">
                <IoCartOutline className="text-[120px] md:text-[150px] text-blue-600 mb-6" />
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest text-blue-700 text-center md:text-left">
                    Cart Me Up
                </h1>
                <p className="text-blue-600 mt-4 text-lg text-center max-w-md">
                    Welcome to Cart Me Up! Your one-stop shop to manage your products and orders easily.
                </p>
            </div>

            {/* Right Side - White Form */}
            <div className="w-full md:w-[40%] bg-white flex items-center justify-center p-6 md:p-8 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm flex flex-col gap-6">

                    <div className="flex flex-col items-center mb-6">
                        <IoCartOutline className="text-4xl text-blue-600 mb-2" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-700">{status}</h2>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm mb-2 text-center font-medium bg-red-50 p-2 rounded-lg animate-fade-in">
                            {error}
                        </p>
                    )}

                    {/* Username */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            {...register("username", { required: "Username is required" })}
                            className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                            className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-[200px] py-3 mx-auto rounded-md text-white font-semibold transition duration-200 ${
                            isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    >
                        {isSubmitting ? "Processing..." : status}
                    </button>

                    {/* Switch Link */}
                    {method === "login" ? (
                        <p className="text-sm text-center text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
                        </p>
                        ) : (
                        <p className="text-sm text-center text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                        </p>
                    )}

                </form>
            </div>
        </div>
    );


};

export default Form;