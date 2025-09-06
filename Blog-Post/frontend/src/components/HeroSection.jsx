import React from 'react'
import bgImage from  '../assets/background_img.jpg'

const HeroSection = () => {

    return (
        //  huge ass div with image
        <div className='mx-20 mt-15 px-25 py-10 relative' style={{ backgroundImage: `url(${bgImage})`}}>
            <div className='w-[40%] h-full absolute top-0 left-0 bg-black z-0'></div>

            <div className='w-[50%] mr-auto bg-white p-15 py-20 min-h-150 flex flex-col gap-6 relative z-10'>
                <div className='flex gap-4 text-sm'>
                    <span>FEBRUARY 1, 2019</span>
                    <span>•</span>
                    <span>FEATURED</span>
                    <span>•</span>
                    <span>4 COMMENTS</span>
                </div>

                    <div className='w-50 h-1 bg-red-500'></div>

                <h1 className='text-[2.5rem] font-extrabold leading-tight tracking-tight    '>At daybreak of the fifteen day of my search</h1>
                <h3>When the ampitheater had cleared had cleared I crept stealthily to the top and as the great excavation lay...</h3>
            </div>
        </div>
    )
}

export default HeroSection