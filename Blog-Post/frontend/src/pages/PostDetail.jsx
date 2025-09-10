import React, {useState, useEffect,} from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useFetchComments } from '../hooks'

const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost ] = useState({});
    const [comment, setComment] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const { comments, setComments } = useFetchComments(id)

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

    
    const handleCancel = () => {
        setComment("");
        setIsFocused(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await api.post('api/comments/', {post: id, content: comment});
            console.log(response.data);

            setComments((prev) => [response.data, ...prev])
            setComment('');
            setIsFocused(false);

            setPost((prev) => ({...prev, comment_counts: (prev.comment_counts || 0) + 1}))

        }
        catch(error){
            console.error('Failed to comment: ', error)
        }
    }


    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Link to="/"><IoIosArrowRoundBack size={30}/> </Link>
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

            <form className='mt-[20px] transition-all duration-[0.2s] ease-in-out mb-[50px]' onSubmit={handleSubmit}>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} onFocus={() => setIsFocused(true)} placeholder='Comment here...' className={`w-full rounded-[20px] pt-2 px-4 outline-0 border transition-all duration-300 text-[12px]
                        ${isFocused ? "h-[100px]" : "h-[40px]"}`}></textarea>

                {isFocused && (
                    <div className='flex justify-end'>
                        <div className='flex gap-[10px]'>
                            <button type='button' className='py-[5px] px-[15px] rounded-[999px] border-0 cursor-pointer bg-[#f1f1f1]' id='cancel-btn' onClick={handleCancel}>Cancel</button>
                            <button type='submit' className='py-[5px] px-[15px] rounded-[999px] border-0 cursor-pointer bg-[#251c3f] text-white' id='comment-btn'>Comment</button>
                        </div>
                    </div>
                )}
            </form>


            <div>
                <div className='h-[2px] bg-red-300 w-[250px]'></div>
                <h1 className='mt-[10px]'>Comments:</h1>

                <div>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className='mb-[20px] border-red-200 border-[1px] p-[10px] rounded-lg'>
                                <div className='flex gap-[8px] items-center'>
                                    <h3 className='font-bold text-[16px] underline'>{comment.author}</h3>
                                    <p className='text-[9px]'> | {new Date(comment.created_at).toLocaleDateString("en-US")}</p>
                                </div>
                                <p className='text-[12px] text-justify my-1'>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 mb-3">No comments yet. Be the first!</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default PostDetail