import React, { useState } from 'react'
import api from '../api/api'

const AddExpenses = () => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0.0)
    const [category, setCategory] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
        }
        catch(error){
            console.log('Failed to add expenses: ', error)
        }
    }

    return (
        <div className='mt-20 w-[500px] mx-auto bg-white shadow-lg rounded-2xl p-8'>
            <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>Add Expense</h1>

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Title</label>
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        type='text'
                        placeholder='Expense title'
                        className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    required />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Amount</label>
                    <input 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        type='number'
                        placeholder='Amount'
                        className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    required />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Category</label>
                    <input 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        type='text'
                        placeholder='Category'
                        className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Start Date</label>
                    <input 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        type='date'
                        className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>End Date</label>
                    <input 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        type='date'
                        className='border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400'
                    />
                </div>

                <button 
                    type='submit' 
                    className='mt-4 bg-teal-400 text-white font-bold py-3 rounded-md hover:bg-teal-500 transition-colors'
                >
                    Save Expense
                </button>
            </form>
        </div>
    )
}

export default AddExpenses

