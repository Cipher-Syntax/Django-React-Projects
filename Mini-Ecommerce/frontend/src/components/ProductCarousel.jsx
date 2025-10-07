import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { useFetchProducts } from '../hooks'
import { Link } from 'react-router-dom'
import LoadingIndicator from './LoadingIndicator'

const ProductCarousel = () => {
    const { products } = useFetchProducts()
    return (
        <div className="w-full px-20 mt-10">
            <Slide
                duration={3000}
                transitionDuration={800} 
                infinite={true}
                indicators={true} 
                arrows={true} 
                autoplay={true}
            >
                {
                    products?.length ? (
                        products?.map((product) => (
                            <div key={product.id} className='flex items-center justify-between bg-white'>
                                <div className='flex flex-col items-start gap-y-5'>
                                    <div>
                                        <h1 className='text-4xl font-bold leading-relaxed tracking-wide'>{product.name}</h1>
                                        <p>{product.description}</p>
                                    </div>

                                    <div>
                                        <Link to={`/products/${product.id}`} className='w-[200px] px-10 py-2 rounded-md bg-white text-blue-500 border-2 font-bold mt-10'>Buy Now</Link>
                                    </div>
                                </div>
                                <div className='p-10 h-[400px] w-[400px]'>
                                    <img src={product.image} alt={product.name} className='object-cover object-center h-full'/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <LoadingIndicator></LoadingIndicator>
                    )
                }
            </Slide>
        </div>
    )
}

export default ProductCarousel
