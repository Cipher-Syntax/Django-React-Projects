import React, { useEffect, useState } from 'react'
import api from '../api/api'

const useFetchExpenses = () => {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        const fetchExpenses = async () => {
            try{
                const response = await api.get('api/expenses/')
                setExpenses(response.data)
            }
            catch(error){
                console.log('Failed to fetch expenses: ', error)
            }
        }

        fetchExpenses()
    }, [])

    return { expenses }
}

export default useFetchExpenses