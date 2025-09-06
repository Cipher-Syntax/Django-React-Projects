import React from 'react'
import image from "../assets/blog_post_image.jpg"

const Cards = () => {
    return (
        <div className='px-[60px]'>
            <h5>BROWSE AND READ THE LATEST STUFF</h5>
            <h2>Latest Stories</h2>


            <div className='grid grid-cols-3 gap-8'>
                <div className='w-[350px]'>
                    <img src={image} alt="image" className='w-full h-[250px] object-cover'/>
                    <div className='bg-[#dfdfdf] absolute mt-[-50px] w-[300px]'>
                        <div className='w-full p-[10px]'>
                            <h2 className='text-[20px] font-semibold'>The sunset faded to twilight</h2>
                            <div className='flex gap-2 text-[12px] font-bold mt-2'>
                                <p>09-06-2025</p>
                                <p>Feature</p>
                                <p>Comments</p>
                            </div>

                            <div className='h-[2px] bg-red-400 w-[100px]'></div>

                            <div className='mt-5'>
                                <p className='text-[12px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad doloribus cum, in perspiciatis provident amet dignissimos sint ipsam es...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[350px]'>
                    <img src={image} alt="image" />
                </div>

                <div className='w-[350px]'>
                    <img src={image} alt="image" />
                </div>
            </div>
        </div>
    )
}

export default Cards