import { useEffect, useState } from 'react'
import api from '../api/api'

const useFetchDeals = () => {
    const [deals, setDeals] = useState([])

    // useEffect(() => {
    //     const fetchDailyDeals = await () => {
    //         const response =  api.get('api/deals-of-the-day/')
    //     }
    //     fetchDailyDeals();
    // }, [])
    useEffect(() => {
        const fetchDailyDeals = async () => {
            const response = await api.get('api/deals-of-the-day/')
            setDeals(response.data)
        }
        fetchDailyDeals()
    }, [])

    return { deals }
}

export default useFetchDeals