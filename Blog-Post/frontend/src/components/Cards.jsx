import React from 'react'
import image from "../assets/blog_post_image.jpg"
import { IoIosArrowRoundForward } from "react-icons/io";


const Cards = () => {
    return (
        <div className='mx-20 w-auto mt-20'>
            <h5>BROWSE AND READ THE LATEST STUFF</h5>
            <h2>Latest Stories</h2>

            <div className='grid grid-cols-3 gap-8 mb-30'>
                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other grid */}
            <div className='grid grid-cols-3 gap-8 mb-30'>
                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='w-[350px] mb-30'>
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

                            <div className='flex items-center justify-start mt-3 cursor-pointer text-[12px] gap-3 text-red-400 hover:text-red-500'>
                                <p>READ MORE</p>
                                <IoIosArrowRoundForward size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <button className='rounded-lg bg-red-400 text-white p-[10px] text-[15px] px-[15px] cursor-pointer w-[150px] mb-20 mx-auto'>MORE POST</button>
            </div>
        </div>
    )
}

export default Cards