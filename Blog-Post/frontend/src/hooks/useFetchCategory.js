import React, { useState, useEffect} from 'react'
import { ACCESS_TOKEN } from '../constants'
import api from '../api/api';

const useFetchCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('api/categories/', {
                    headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
                });
                setCategories(response.data);
            } 
            catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, [])

    return { categories, categoryId, setCategoryId }

}

export default useFetchCategory