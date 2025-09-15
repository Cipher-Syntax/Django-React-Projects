import React from 'react'
import { RiMovie2Line } from "react-icons/ri";
import { RiMenu3Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='w-full p-[20px]'>
            <div className='flex items-center justify-between'>
                <RiMovie2Line size={35} className='text-white'/>
                <div className='flex items-center justify-center gap-2'>
                    <RiMenu3Line size={30} className='text-white'/>
                    <Link to="/logout"><CiLogout size={30} className='text-white cursor-pointer'/></Link>
                </div>
            </div>
        </header>
    )
}

export default Header