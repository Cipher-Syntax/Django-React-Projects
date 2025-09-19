import React, { useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'

const AddExpenses = () => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0.0)
    const [category, setCategory] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await api.post('api/expenses/', {title, amount, category, start_date: startDate, end_date: endDate});
            console.log(response.data)

            setTitle('')
            setAmount(0.0)
            setCategory('')
            setStartDate('')
            setEndDate('')
            setMessage('Successfully add expsense')

            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
        catch(error){
            console.log('Failed to add expenses: ', error)
            setMessage('Failed to add expense')
        }
    }

    return (
        <div className="mt-20 w-[500px] mx-auto bg-white shadow-lg rounded-2xl p-8">
            <Link to="/"><h3 className='underline'>Back</h3></Link>
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
                Add Expense
            </h1>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Title + Amount */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Expense title"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Amount</label>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            placeholder="Amount"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Category</label>
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        type="text"
                        placeholder="Category"
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                {/* Dates Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Start Date</label>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">End Date</label>
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="date"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors shadow-md cursor-pointer"
                >
                    Save Expense
                </button>

                {message && (
                    <p className={`mt-4 text-center ${message.includes("Successfully") ? "text-green-400" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}

export default AddExpenses