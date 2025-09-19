import React, { useEffect, useState } from 'react'
import { AddExpenses, ExpenseChart, ExpenseFilters, ExpenseList } from '../components'
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
            <AddExpenses></AddExpenses>
            <ExpenseFilters setExpenses={setFilteredExpenses} />
            <ExpenseList expenses={filteredExpenses} />
        </>
    )
}

export default Home
