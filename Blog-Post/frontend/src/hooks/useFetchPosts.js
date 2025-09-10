import React, { useState, useEffect} from 'react'
import api from '../api/api'

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('api/posts/');
                setPosts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchPosts();
    }, [])

    return { posts }
}

export default useFetchPosts