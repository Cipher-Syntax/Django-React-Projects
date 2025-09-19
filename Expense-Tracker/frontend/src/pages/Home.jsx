import React, { useEffect, useState } from 'react'
import { AddExpenses, ExpenseChart, ExpenseFilters, ExpenseList, ExpensePieChart } from '../components'
import { useFetchExpenses } from '../hooks'

const Home = () => {
    const { expenses } = useFetchExpenses() 
    const [filteredExpenses, setFilteredExpenses] = useState([])

    useEffect(() => {
        setFilteredExpenses(expenses)
    }, [expenses])

    return (
        <>
            <ExpenseChart expenses={filteredExpenses} />
            <ExpensePieChart expenses={filteredExpenses}></ExpensePieChart>
            <AddExpenses></AddExpenses>
            <ExpenseFilters setExpenses={setFilteredExpenses} />
            <ExpenseList expenses={filteredExpenses} />
        </>
    )
}

export default Home
