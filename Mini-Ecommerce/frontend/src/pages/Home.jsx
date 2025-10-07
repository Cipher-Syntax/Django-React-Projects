import React from 'react'
import { DealsOfTheDay, Header, ProductCarousel, Products, Footer } from '../components'

const Home = () => {
    return (
        <>
            <Header></Header>
            <ProductCarousel></ProductCarousel>
            <Products></Products>
            <DealsOfTheDay></DealsOfTheDay>
            <Footer></Footer>
        </>
    )
}

export default Home