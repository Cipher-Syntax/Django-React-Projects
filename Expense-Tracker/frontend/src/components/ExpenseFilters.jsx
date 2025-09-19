import React, { useState } from 'react'
import api from '../api/api';
import { Link } from 'react-router-dom';
import { useFetchExpenses } from '../hooks';

const ExpenseFilters = ({ setExpenses }) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const { expenses } = useFetchExpenses()
    const [category, setCategory] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let url = "api/expenses/"

            if (startDate) {
                url += `?start_date=${startDate}`;
            }

            if (endDate) {
                url += `${startDate ? '&' : '?'}end_date=${endDate}`
            }

            if (category) {
                url += `${url.includes('?') ? '&' : '?'}category=${category}`;
            }


            const response = await api.get(url)
            setExpenses(response.data)
        } 
        catch (error) {
            console.log('Failed to filter: ', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-between items-center w-full p-10">
            <div className="flex items-end gap-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                    />
                </div>

                
                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1">Categories</label>
                    <select name="category" id="category" className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option className='disabled' value="">Select Category</option>
                        {[...new Set(expenses.map(exp => exp.category))].map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>


                <button
                    type="submit"
                    className="bg-[#00df9a] text-white font-bold px-4 py-1.5 cursor-pointer rounded-md hover:bg-[#19c790] transition-colors"
                >
                    Apply Filter
                </button>
            </div>

            <Link to="/add_expenses">
                <button className="bg-blue-500 text-white font-bold px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                    Add Expenses
                </button>
            </Link>
        </form>
    )
}

export default ExpenseFilters
