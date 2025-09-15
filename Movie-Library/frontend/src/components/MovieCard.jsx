import React, { useState } from 'react'
import { useFetchMovies } from '../hooks'
import { HeroSection } from '../components' 

const MovieCard = () => {
    const { movies } = useFetchMovies()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredMovies = movies.filter((movie) => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((genre) => genre.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )


    return (
        <div>
            <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery}></HeroSection>

            {
                filteredMovies.length === 0 ? (
                    <p className='text-center my-10'>No Movies found</p>
                ) : (
                    <div className='w-full flex flex-wrap mx-auto p-[10px] gap-10 justify-center sm:grid sm:grid-cols-4 sm:p-20'>
                        {
                            filteredMovies.map((movie, index) => (
                                <div key={index} className='w-60 justify-self-center-safe h-96 relative rounded-lg overflow-hidden hover:translate-y-[-10px] ease-in-out duration-[0.5s] cursor-pointer'>
                                    <div className='absolute inset-0'>
                                        { movie.image ? (
                                            <img src={movie.image} alt={movie.title} className='w-full h-full object-cover object-top'></img>
                                        ) : (
                                            <div className='w-full h-full bg-gray-800 flex items-center justify-center text-gray-400'>No Image</div>
                                        )}
                                    </div>

                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                                        <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                                        <p className='text-[12px] text-justify'>{movie.description}</p>
                                        <div className="flex justify-between items-center text-gray-300 text-sm mt-1">
                                            <span className='flex justify-self-start items-start gap-2 flex-wrap'> 
                                                {
                                                    movie.genres.map((genre) => (
                                                        <p key={genre.id} className='bg-[#00df9a] px-[8px] py-[3px] text-black rounded-sm'>{genre.name}</p>
                                                    ))
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            
        </div>
    )
}

export default MovieCard