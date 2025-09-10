import React, { useState } from 'react'
import { Header, Filter} from '../components'
import { useFetchPosts, useFetchCategory } from '../hooks'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from 'react-icons/io'

const Posts = () => {
    const { posts } = useFetchPosts()
    const { categories } = useFetchCategory()

    const [categoryId, setCategoryId] = useState("")
    const [sort, setSort] = useState("")

    let filteredPosts = posts

    if (categoryId) {
        filteredPosts = filteredPosts.filter(post => post.category?.id === parseInt(categoryId))
    }

    // sort by "popular" (comments) or "latest" (date)
    if (sort === "popular") {
        filteredPosts = [...filteredPosts].sort((a, b) => (b.comment_counts || 0) - (a.comment_counts || 0))
    } 
    else if (sort === "latest") {
        filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return (
        <div>
            <Header></Header>

            <Filter 
                categories={categories} 
                categoryId={categoryId} 
                setCategoryId={setCategoryId} 
                sort={sort} 
                setSort={setSort} >
            </Filter> 

            <div className='grid grid-cols-1 sm:grid sm:grid-cols-3 gap-8 w-full p-20 pt-0'>
                {filteredPosts.map((post) => (
                    <div key={post.id} className='w-[350px] mb-40'>
                        <img src={post.image} alt="post" className='w-full h-[250px] object-cover'/>
                        <div className='bg-[#dfdfdf] absolute mt-[-50px] w-[300px]'>
                            <div className='w-full p-[10px]'>
                                <h2 className='text-[20px] font-semibold'>{post.title}</h2>
                                
                                <div className='flex gap-2 text-[12px] font-bold mt-2'>
                                    <p>{new Date(post.created_at).toLocaleDateString('en-US')} • </p>
                                    <p>{post.category?.name} • </p>
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
                ))}
            </div>
            </div>
    )
}

export default Posts