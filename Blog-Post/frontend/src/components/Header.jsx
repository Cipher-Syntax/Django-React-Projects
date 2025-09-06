import React, { useState } from 'react'
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { FaFacebookSquare, FaGithubSquare, FaLinkedinIn, FaYoutubeSquare } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"

const Header = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebar = () => {
        const sidebar = document.getElementById('sidebar')

        if (!showSidebar) {
            sidebar.classList.remove('hidden')
            sidebar.classList.add('flex')
        } 
        else {
            sidebar.classList.add('hidden')
            sidebar.classList.remove('flex')
        }

        setShowSidebar(!showSidebar)
    }


    return (
        <header className='py-[40px] px-[60px] flex items-center justify-between border-b-1 border-[#aeaeae]'>
            <div className='hidden sm:flex gap-2 flex-1'>
                <GoSearch  size={20} className='cursor-pointer'/>
                <RiMenu2Fill size={20} className='cursor-pointer' />
            </div>

            <div className='flex-1'>
                <h1 className='text-left text-[40px] font-extralight tracking-wide sm:text-[60px] sm:text-center '>Mind<span className='font-bold'>Fuel</span></h1>
                <h3 className='text-left text-[13px] sm:text-center sm:text-[15px]'>Ignite Your Mind. Fuel Your Life</h3>
            </div>
            <nav className='hidden sm:flex sm:gap-2 flex-1 justify-end'>
                <span><a href=""></a><FaFacebookSquare size={20} className='cursor-pointer'/></span>
                <span><a href=""></a><FaGithubSquare size={20} className='cursor-pointer'/></span>
                <span><a href=""></a><FaLinkedinIn size={20} className='cursor-pointer'/></span>
                <span><a href=""></a><FaYoutubeSquare size={20} className='cursor-pointer' /></span>
            </nav>

            <div className='block sm:hidden'>
                <RiMenu3Fill size={20} className='cursor-pointer' onClick={handleSidebar}/>

                <nav className='hidden flex-col gap-2 mt-4 sm:hidden absolute' id='sidebar'> 
                    <span><a href=""></a><FaFacebookSquare size={20} className='cursor-pointer'/></span>
                    <span><a href=""></a><FaGithubSquare size={20} className='cursor-pointer'/></span>
                    <span><a href=""></a><FaLinkedinIn size={20} className='cursor-pointer'/></span>
                    <span><a href=""></a><FaYoutubeSquare size={20} className='cursor-pointer' /></span>
                </nav>
            </div>
        </header>

    )
}

export default Header