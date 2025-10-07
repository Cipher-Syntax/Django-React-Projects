import React, { useState, useEffect } from 'react'
import api from '../api/api'

const useFetchProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get('api/products/');
            setProducts(response.data);
        }

        fetchProducts();
    }, [])
    return { products }
}

export default useFetchProducts