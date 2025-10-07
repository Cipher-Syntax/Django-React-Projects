import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetchProducts } from '../hooks'
import LoadingIndicator from './LoadingIndicator'

const Products = () => {
    const { id } = useParams()
    const { products } = useFetchProducts()
    return (
        <section className='w-full px-20 my-10'>
            <h1 className='w-[90%] mx-auto text-3xl'>Products</h1>
            <div className='grid grid-cols-5 gap-y-20 w-[90%] mx-auto'>
                {
                    products?.length ? (
                        products?.map((product) => (
                            <Link to={`/products/${product.id}`} className='w-[200px] shadow-2xl h-[280px] flex flex-col items-center justify-center cursor-pointer' key={product.id}>
                                <img 
                                    src={product.image}
                                    alt={product.name}
                                    className='w-[85%] h-[150px] object-cover rounded-sm'
                                />
                                <h5 className='text-[14px] leading-relaxed tracking-wide mt-5 text-gray-800 text-center'>{product.name.slice(0, 15) + "..."}</h5>
                                <p className='text-gray-400 text-[10px] px-3 text-center leading-relaxed tracking-wide mt-1'>{product.description.slice(0, 40) + "..."}</p>
                                <div className="flex items-center justify-end w-full px-3 mt-5 text-[12px]">
                                    {/* <p>⭐ 5.0</p> */}
                                    <p className="font-semibold text-red-500">₱ {product.price}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <LoadingIndicator></LoadingIndicator>
                    )
                }

            </div>
        </section>
    )
}

export default Products