import React from "react";
import postImage from "../assets/blog_post_image.jpg"
import { IoIosArrowRoundForward } from "react-icons/io";
import { useFetchPosts } from '../hooks';
import { Link } from "react-router-dom";

const Cards = () => {
    const { posts } = useFetchPosts();

    return (
        <div className='mx-20 w-auto mt-20'>
            <h5 className='text-[#323232] font-semibold'>BROWSE AND READ THE LATEST STUFF</h5>
            <h2 className='text-[#323232] font-semibold my-5 text-4xl'>Latest Stories</h2>

            {/* Posts Grid */}
            <div className='grid grid-cols-1 sm:grid sm:grid-cols-3 gap-8'>
                {posts.slice(0, 6).map((post, index) => {
                    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    });

                    return (
                        <div key={index} className='w-[350px] mb-40'>
                            <img src={post.image} alt="post" className='w-full h-[250px] object-cover'/>
                            <div className='bg-[#dfdfdf] absolute mt-[-50px] w-[300px]'>
                                <div className='w-full p-[10px]'>
                                    <h2 className='text-[20px] font-semibold'>{post.title}</h2>

                                    <div className='flex gap-2 text-[12px] font-bold mt-2'>
                                        <p>{formattedDate}</p>
                                        <p>{post.category?.name}</p>
                                        <p>{post.comment_counts || 0} Comments</p>
                                    </div>

                                    <div className='h-[2px] bg-red-400 w-[100px]'></div>

                                    <div className='mt-5'>
                                        <p className='text-[12px]'>
                                            {post.content?.slice(0, 100)}...
                                        </p>
                                    </div>

                                    <Link to={`/posts/${post.id}/`} className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500 hover:underline'>
                                        <p>READ MORE</p>
                                        <IoIosArrowRoundForward size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='flex justify-center mt-30'>
                <button className='rounded-lg bg-red-400 text-white p-[10px] text-[15px] px-[15px] cursor-pointer w-[150px] mb-20 mx-auto'>MORE POST</button>
            </div>
        </div>
    )
}

export default Cards