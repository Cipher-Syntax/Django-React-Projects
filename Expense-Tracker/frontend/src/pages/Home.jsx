import React, { useEffect, useState } from 'react'
import { ExpenseChart, ExpenseFilters, ExpenseList, ExpensePieChart } from '../components'
import { useFetchExpenses } from '../hooks'

const Home = () => {
    const { expenses } = useFetchExpenses() 
    const [filteredExpenses, setFilteredExpenses] = useState([])

    useEffect(() => {
        setFilteredExpenses(expenses)
    }, [expenses])

    return (
        <>
            <h1 className='text-center font-bold text-3xl my-5 tracking-widest'>Expense Tracker</h1>
            <div className='flex justify-center items-center my-20 px-40'>
                <ExpensePieChart expenses={filteredExpenses}></ExpensePieChart>
                <ExpenseChart expenses={filteredExpenses} />    
            </div>
            
            <ExpenseFilters setExpenses={setFilteredExpenses} />
            <ExpenseList expenses={filteredExpenses} />
        </>
    )
}

export default Home
