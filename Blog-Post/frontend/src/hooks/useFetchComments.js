import React, { useState, useEffect } from 'react'
import api from '../api';

const useFetchComments = (postId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
        const fetchComments = async () => {
            try{
                const response = await api.get(`/api/comments/?post_id=${postId}`);
                setComments(response.data);
            }
            catch(error){
                console.error('Failed to fetch comments: ', error)
            }
        }

        if(postId){
            fetchComments()
        }
    }, [postId])

    return { comments, setComments }
}

export default useFetchComments