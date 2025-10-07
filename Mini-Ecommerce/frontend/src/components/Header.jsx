import React, { useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import api from '../api/api';
import { Link, useSearchParams } from 'react-router-dom';

const Header = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const response = await api.get('api/cart/count/');
                setCartCount(response.data.count);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCartCount();
        const interval = setInterval(fetchCartCount, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className='w-full px-10 lg:px-20 h-[70px] flex items-center justify-between shadow-lg bg-white sticky top-0 z-50'>
            
            <div className='flex items-center gap-x-3'>
                <IoCartOutline size={25} className='text-blue-500'></IoCartOutline>
                <h1 className='leading-relaxed tracking-wider text-2xl font-bold text-blue-600'>Cart Me Up</h1>
            </div>

            <div className='flex-1 mx-10 max-w-[500px]'>
                <div className='relative'>
                    <CiSearch className='absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black' />
                    <input 
                        type="text" 
                        placeholder='Search products here...' 
                        value={q}
                        onChange={(e) => setSearchParams(prev => {
                            const params = new URLSearchParams(prev);
                            params.set('q', e.target.value);
                            return params;
                        })}
                        className='w-full bg-gray-100 text-black placeholder-gray-400 px-16 py-2 rounded-full outline-none focus:ring-1 focus:ring-blue-400 text-sm'
                    />
                </div>
            </div>

            <Link  to="/cart"  className='relative flex items-center' title="Go to Cart"
            >
                <IoCartOutline size={25} className='text-blue-500'></IoCartOutline>
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold'>
                        {cartCount}
                    </span>
                )}
            </Link>

        </header>    
    );
}

export default Header;
