import React, { useEffect, useState } from 'react'
import { FaOpencart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import api from '../api/api';
import { Link } from 'react-router-dom';


const Header = ({ q, setSearchParams }) => {
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const fetchCartCount = async () => {
            const response = await api.get('api/cart/count/');
            console.log(response.data)
            setCartCount(response.data.count);
        }
        fetchCartCount();

        const interval = setInterval(fetchCartCount, 1000);
        return () => clearInterval(interval);
    }, [])
    return (
        <header className='w-full px-20 h-[70px] flex items-center justify-between shadow-lg'>
            <div className='flex items-center justify-center gap-x-3'>
                <FaOpencart size={25} className='text-blue-500'></FaOpencart>
                <h1 className='leading-relaxed tracking-wider text-2xl font-bold'>Cart Me Up</h1>
            </div>

            <div className='flex items-center gap-10'>
                <div className='w-[500px]'>
                    <div className='relative'>
                        <CiSearch className='absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black'></CiSearch>
                        <input 
                            type="text" 
                            placeholder='Search products here...' 
                            value={q}
                            onChange={(e) => setSearchParams(prev => {
                                const params = new URLSearchParams(prev);
                                params.set('q', e.target.value);
                                return params;
                            })}
                            className='w-full bg-white text-black placeholder:-white px-16 py-2 rounded-full outline-1 focus:outline-1 text-sm'
                        />
                    </div>
                </div>
                <Link to="/cart" className={`flex ${cartCount > 0 ? 'animate-bounce' : ''}`}>
                    <FaOpencart size={25} className='text-blue-500'></FaOpencart>
                    <p className='text-[11px] font-extrabold leading-relaxed tracking-widest text-blue-500'>{cartCount}</p>
                </Link>
                
            </div>
            
            {/* <div className='flex flex-col items-center justify-center'>
                <FaOpencart size={20}></FaOpencart>
                <h1 className='text-[10px]'>Cart</h1>
            </div> */}
            
        </header>    
    )
}

export default Header