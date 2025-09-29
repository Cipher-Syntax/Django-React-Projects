import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
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
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex flex-col items-center justify-center text-blue-600 mb-10 md:mb-0 md:mr-16">
                <FaOpencart className="text-[120px] md:text-[150px]" />
                <h1 className="font-extrabold tracking-widest text-4xl md:text-6xl mt-4">
                    Cart Me Up
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl rounded-2xl w-[350px] md:w-[400px] p-8 flex flex-col gap-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FaOpencart className="text-3xl text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">{status}</h2>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-2 text-center font-medium bg-red-50 p-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* Username */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-gray-700 font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "At least 6 characters" },
                        })}
                        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 cursor-pointer rounded-lg text-white font-semibold transition duration-200 ${
                        isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}>
                    {isSubmitting ? "Processing..." : status}
                </button>

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
    );
};

export default Form;