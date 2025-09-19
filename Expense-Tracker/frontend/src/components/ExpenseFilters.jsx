import React, { useState } from 'react'
import api from '../api/api';

const ExpenseFilters = ({ setExpenses }) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let url = "api/expenses/"
            // if (startDate && endDate) {
            //     url += `?start_date=${startDate}&end_date=${endDate}`
            // }
            // else if(startDate){
            //     url += `?start_date=${startDate}`
            // }
            // else if(endDate){
            //     url += `?end_date=${endDate}`
            // }

            // check if startdate exist
            if (startDate) {
                // starting url query
                url += `?start_date=${startDate}`;
            }

            // check if enddate exist
            if (endDate) {
                // check if startdate exist: 
                // if exist, add & then merge 'end_date' url query
                // else, start new url query via ?
                url += `${startDate ? '&' : '?'}end_date=${endDate}`
            }

            const response = await api.get(url)
            setExpenses(response.data)
        } 
        catch (error) {
            console.log('Failed to filter: ', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col">
                <label className="text-gray-700 mb-1">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-700 mb-1">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
            </div>

            <button
                type="submit"
                className="self-end bg-teal-400 text-white font-bold px-4 py-2 rounded-md hover:bg-teal-500 transition-colors"
            >
                Apply Filter
            </button>
        </form>
    )
}

export default ExpenseFilters
