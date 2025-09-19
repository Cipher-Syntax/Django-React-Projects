import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register, Login, Home, NotFound } from './pages'
import { AddExpenses, ProtectedRoute } from './components'

const Logout =  () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    return <Navigate to="/login"></Navigate>
}

const RegisterAndLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    return <Register></Register>
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterAndLogout></RegisterAndLogout>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/logout' element={<Logout></Logout>}></Route>
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home></Home>
                    </ProtectedRoute>
                }>
                </Route>
                <Route path='/add_expenses' element={
                    <ProtectedRoute>
                        <AddExpenses></AddExpenses>
                    </ProtectedRoute>
                }>
                </Route>

                <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App