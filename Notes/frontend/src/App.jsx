import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register, Login, Home, NotFound } from './pages'
import ProtectedRoute from './components/ProtectedRoute'

const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login/"></Navigate>
}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register></Register>
}

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>}>
          </Route>

          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/logout' element={<Logout></Logout>}></Route>
          <Route path='/register' element={<RegisterAndLogout></RegisterAndLogout>}></Route>

          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App