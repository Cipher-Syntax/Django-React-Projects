import React, { useState, useEffect } from 'react'
import bgImage from  '../assets/background_img.jpg'
import api from '../api/api'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";

const HeroSection = () => {
    const [randomPost, setRandomPost] = useState(null)

    useEffect(() => {
        getRandomPost()
    }, [])

    const getRandomPost = async () => {
        try {
            const response = await api.get('api/posts/')
            if (response.data) {
                // Seed randomness by date → stable for the whole day
                const today = new Date().toDateString()

                // turns date string into a number (seed)
                const hash = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

                // always within the range of available posts
                const randomIndex = hash % response.data.length

                // this will be the "random for today" post
                setRandomPost(response.data[randomIndex]) 
            }
        } 
        catch (error) {
            console.error('Failed to get random post: ', error)
        }
    }

    if (!randomPost) return null


    return (
        //  huge ass div with image
        <div className='hidden sm:block mx-20 mt-15 px-25 py-10 relative' style={{ backgroundImage: `url(${randomPost.image ? randomPost.image : bgImage})`}}>
            <div className='w-[40%] h-full absolute top-0 left-0 bg-black z-0'></div>

            <div className='w-[50%] mr-auto bg-white p-15 py-20 min-h-150 flex flex-col gap-6 relative z-10'>
                <div className='flex gap-4 text-sm'>
                    <span>{new Date(randomPost.created_at).toLocaleDateString("en-US")}</span>
                    <span>•</span>
                    <span>{randomPost.category?.name || "General"}</span>
                    <span>•</span>
                    <span>{randomPost.comment_counts || 0} COMMENTS</span>
                </div>

                <div className='w-50 h-1 bg-red-500'></div>

                <h1 className='text-[2.5rem] font-extrabold leading-tight tracking-tight '>
                    {randomPost.title}
                </h1>
                {/* show a preview of content */}
                <h3>{randomPost.content?.slice(0, 150)}...</h3>

                <Link to={`/posts/${randomPost.id}/`} className='flex items-center justify-start mt-2 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500 hover:underline'>
                    <p>READ MORE</p>
                    <IoIosArrowRoundForward size={20} />
                </Link>
            </div>
        </div>
    )
}

export default HeroSection
