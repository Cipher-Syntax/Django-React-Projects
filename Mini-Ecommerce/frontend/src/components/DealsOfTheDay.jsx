import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { useFetchDeals } from '../hooks'
import { Link } from 'react-router-dom'
import LoadingIndicator from './LoadingIndicator'

const DealsOfTheDay = () => {
    const { deals } = useFetchDeals()

    return (
        <section className='mt-20 w-full px-10 lg:px-20 py-16 bg-blue-400'>
            <div className='flex flex-col lg:flex-row gap-10 items-start'>
                
                {/* Left: Heading (60%) */}
                <div className='w-full lg:w-3/5 text-white'>
                    <h1 className='text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-wider'>
                        Deals Of The Day
                    </h1>
                    <h2 className='text-3xl lg:text-4xl font-bold tracking-wide'>
                        {new Date().toLocaleDateString('en-PH', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                    </h2>
                    <p className='mt-6 max-w-md text-lg lg:text-xl text-blue-100'>
                        Grab the best deals today! Limited time offers on selected products.
                    </p>
                </div>

                <div className='w-full lg:w-2/5'>
                    <Slide
                        duration={3000}
                        transitionDuration={800} 
                        infinite={true}
                        indicators={true} 
                        slidesToShow={3}
                        arrows={true} 
                        autoplay={true}
                        easing="ease"
                    >
                        {
                            deals?.products?.length > 0 ? (
                                deals?.products?.map((deal) => (
                                    <div key={deal.id} className="px-2">
                                        <Link
                                            to={`/products/${deal.id}`}
                                            className='w-full h-[280px] bg-white shadow-2xl rounded-md flex flex-col items-center justify-center cursor-pointer'
                                        >
                                            <img 
                                                src={deal.image}
                                                alt={deal.name}
                                                className='w-[85%] h-[150px] object-cover rounded-sm'
                                            />
                                            <h5 className='text-[14px] mt-4 text-gray-800 text-center font-semibold'>
                                                {deal.name.slice(0, 15)}...
                                            </h5>
                                            <p className='text-gray-400 text-[10px] px-3 text-center mt-1 line-clamp-2'>
                                                {deal.description.slice(0, 40)}...
                                            </p>
                                            <div className='flex items-center justify-end w-full px-3 mt-3 text-[12px]'>
                                                <p className='font-semibold text-red-500'>₱ {deal.price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <LoadingIndicator></LoadingIndicator>
                            )
                        }
                    </Slide>
                </div>
            </div>
        </section>
    )
}

export default DealsOfTheDay
