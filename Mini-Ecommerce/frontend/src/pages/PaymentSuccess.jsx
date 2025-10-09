import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
                <p className="mt-4 text-gray-600">Thank you for your payment.</p>
                <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
