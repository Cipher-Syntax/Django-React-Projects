import React from 'react'
import { RiMovie2Line } from "react-icons/ri";
import { RiMenu3Line } from "react-icons/ri";

const Header = () => {
    return (
        <header className='w-full p-[20px]'>
            <div className='flex items-center justify-between'>
                <RiMovie2Line size={35} className='text-white'/>
                <RiMenu3Line size={30} className='text-white'/>
            </div>
        </header>
    )
}

export default Header