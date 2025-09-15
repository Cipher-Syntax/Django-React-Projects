import React, { useEffect, useState } from 'react'
import api from '../api/api'

const useFetchMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const response = await api.get('api/movies/')
                console.log(response.data)
                setMovies(response.data)
            }
            catch(error){
                console.error('Failed to get movies: ', error)
            }
        }

        fetchMovies()
    }, [])
    
    return { movies }
}

export default useFetchMovies