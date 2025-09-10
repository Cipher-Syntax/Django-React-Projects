import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Filter = ({categories, categoryId, setCategoryId, sort, setSort}) => {
    return (
        <div className='px-20 mt-15 mb-3 flex gap-[10px] items-center'>
            <Link to="/"><IoIosArrowRoundBack size={30}/> </Link>
            <select className='border p-2 rounded outline-0 cursor-pointer' value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">All</option>
                <option value="popular">Popular</option>
                <option value="latest">Latest</option>
            </select>

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-2 rounded outline-0 cursor-pointer" >
                <option value="">Select category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Filter