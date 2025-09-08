import React, {useState, useEffect, use} from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { IoIosArrowRoundBack } from 'react-icons/io'

const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost ] = useState([]) 

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await api.get(`api/posts/${id}/`)
                setPost(response.data)
            }
            catch(error){
                console.log('Failed to fetch post: ', error)
            }
        }

        fetchPost()
    }, [id])


    return (
        <div className="max-w-2xl mx-auto mt-10">
            <a href="/"><IoIosArrowRoundBack size={30}/> </a>
            <img src={post.image} alt={post.title} className="w-full h-[300px] object-cover rounded-md" />
            <h1 className="text-3xl font-bold mt-5">{post.title}</h1>
            <p className="text-gray-500 text-sm mt-2">
                {new Date(post.created_at).toLocaleDateString("en-US")} • {post.category?.name}
            </p>
            <div className="h-[2px] bg-red-400 w-[100px] my-3"></div>
            <p className="mt-5 leading-7 text-justify text-[12px]">{post.content}</p>
            <div className='flex gap-3'>
                <p className="mt-5 text-sm text-gray-600 cursor-pointer">{post.like_counts || 0} Likes</p>

                <p className="mt-5 text-sm text-gray-600 cursor-pointer">{post.comment_counts || 0} Comments</p>
            </div>
        </div>
    )
}

export default PostDetail