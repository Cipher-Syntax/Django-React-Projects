import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Header, LoadingIndicator } from '../components';
import { FaCheckCircle } from "react-icons/fa";


const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState(false)
    const [rerender, setRerender] = useState(0);

    const increaseAmount = () => {
        setQuantity(q => q + 1);
    }
    const decreaseAmount = () => {
        setQuantity((q) => {
            if(q <= 1){
                setQuantity(1)
            }
            else{
                setQuantity(q - 1)
            }
        });
    }

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await api.get(`/api/products/${id}/`)
                setProduct(response.data)
            } catch (error) {
                console.error('Failed to fetch product:', error)
                setError('Failed to load product details')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchProductById()
    }, [id])

    const addToCart = async () => {
        try {
            const response = await api.post('/api/cart/add/', {
                product_id: product.id,
                quantity: quantity
            })
            // alert('Product added to cart!')
            setRerender(rerender + 1)
            setMessage(true)
            const timeout = setTimeout(() => {
                setMessage(false);
            }, 2000)
            console.log(response.data)
            return () => clearTimeout(timeout);
        } 
        catch (error) {
            console.error('Error adding to cart:', error)
        }
    }


    if (loading) return <div className='min-h-screen grid items-center'><LoadingIndicator></LoadingIndicator></div>
    if (error) return <p className='text-center flex items-center justify-center min-h-screen'>{error}</p>
    if (!product) return <p className='text-center flex items-center justify-center min-h-screen'>No product found.</p>

    return (
        <>
            <Header rerender={rerender}></Header>
            <div className='p-10'>
                <Link to="/" className='flex gap-3 items-center text-2xl'>
                    <IoIosArrowRoundBack size={30}></IoIosArrowRoundBack>
                    Back
                </Link>
                <div className='w-full shadow-lg rounded-md h-[500px] flex items-left justify-between p-5 min-h-screen'>
                    <div className='h-[480px] flex items-center justify-center p-10'> 
                        <img src={product.image} alt={product.name} className='h-full object-cover'/>
                    </div>
                    <div>
                        <h1 className='text-4xl font-bold leading-relaxed tracking-wider'>{product.name}</h1>
                        <p className='text-gray-500 text-[14px]'>{product.description}</p>

                        <div className='mt-5 font-semibold text-blue-500 text-2xl'>
                            PHP {(Number(product.price) || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>

                        
                        <div className='flex gap-10 mt-10 items-center'>
                            <h2>Quantity</h2>
                            <div className='flex gap-2'>
                                <button className='bg-gray-200 rounded-sm w-[40px] h-[40px] flex items-center justify-center' onClick={decreaseAmount}> - </button>
                                <h3 className='bg-gray-200 rounded-sm w-[40px] h-[40px] flex items-center justify-center'>{quantity}</h3>
                                <button className='bg-gray-200 rounded-sm w-[40px] h-[40px] flex items-center justify-center' onClick={increaseAmount}> + </button>
                            </div>

                            
                        </div>
                        {message && (
                            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                            bg-green-500 w-16 h-16 rounded-full flex items-center justify-center 
                                            shadow-lg animate-slide-down z-50'>
                                <FaCheckCircle className='text-white w-8 h-8' />
                            </div>
                        )}
                        <div className='flex gap-5 mt-40'>
                            <button className='w-[170px] border-2 border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' onClick={addToCart}>Add To Cart</button>
                            <button className='w-[170px] bg-blue-500 text-white rounded-lg py-2 cursor-pointer'>Buy Now</button>
                        </div>
                    </div>
                </div>
                {/* <h1 className='text-2xl font-bold'>{product.name}</h1>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-[300px] h-[300px] object-cover my-4 rounded-md shadow-md'
                />
                <p className='text-gray-600'>{product.description}</p>
                <p className='text-red-500 font-semibold text-lg mt-2'>₱ {product.price}</p> */}
            </div>
        </>
    )
}

export default ProductDetails
