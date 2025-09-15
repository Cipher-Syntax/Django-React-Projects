import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { ReactTyped } from 'react-typed'

const HeroSection = ( {searchQuery, setSearchQuery }) => {
    return (
        <section className='w-full p-10 mt-20'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-[#00df9a] font-bold text-2xl sm:text-5xl'>Immerse In The Magic Of Movies</h1>
                <ReactTyped
                    strings={[
                        "Discover timeless Movies",
                        "Explore captivating Books",
                        "Search by your favorite Genre",
                        "Find stories from top Authors",
                        "Your library of endless adventures"
                    ]}
                    typeSpeed={60}
                    backSpeed={40}
                    loop className='text-[15px] mt-2 sm:text-3xl'>
                </ReactTyped>
            </div>

            <div className='max-w-lg mx-auto my-20'>
                <div className='relative'>
                    <CiSearch className='absolute left-6 top-1/2 transform -translate-y-1/2 text-black w-5 h-5'></CiSearch>

                    <input type="text" placeholder='Search Movies' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full bg-white text-black placeholder:-white px-16 py-3 rounded-full outline-none text-lg'/>
                </div>
            </div>
        </section>
    )
}

export default HeroSection