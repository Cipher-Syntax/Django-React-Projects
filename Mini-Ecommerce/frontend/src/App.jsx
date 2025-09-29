import React from 'react'
import { ProtectedRoute } from './components'
import { Register, Login, Home, NotFound } from './pages'
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
                <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App