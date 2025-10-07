import React from 'react'
import { Header, Products, ProtectedRoute } from './components'
import { Register, Login, Home, NotFound, ProductDetails, ProductCart } from './pages'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


const clearAuth = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}
const Logout = () => {
    clearAuth();
    return <Navigate to="/login"></Navigate>
}

const App = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path='/register' element={<Register></Register>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/logout' element={<Logout></Logout>}></Route>
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home></Home>
                    </ProtectedRoute>
                }>
                </Route>
                <Route path='/products' element={<Products></Products>}></Route>
                <Route path='/products/:id' element={<ProductDetails></ProductDetails>}></Route>
                <Route path='/cart' element={<ProductCart></ProductCart>}></Route>
                <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App