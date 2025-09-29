import React, { useEffect } from 'react'
import { Form } from '../components'

const Register = () => {
    
    useEffect(() => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }, [])

    return (
        <Form route="api/user/register/" method="register"></Form>
    )
}

export default Register