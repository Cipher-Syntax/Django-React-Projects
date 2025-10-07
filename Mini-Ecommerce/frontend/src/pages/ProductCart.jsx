import React, { useState, useEffect } from 'react'
import { useFetchOrders } from '../hooks'
import { FaTrashAlt } from "react-icons/fa"
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Header } from '../components';
import api from '../api/api';

const ProductCart = () => {
    const { orders, updateOrderItem, deleteOrderItem } = useFetchOrders()
    const [selectedItems, setSelectedItems] = useState([])
    const [total, setTotal] = useState(0)

    const handleSelect = (itemId, price, quantity) => {
        setSelectedItems((prev) => prev.some((item) => item.id === itemId)
            ? prev.filter((item) => item.id !== itemId)
            : [...prev, { id: itemId, price, quantity }]
        )
    }

    const handleQuantityChange = async (item, change) => {
        const newQuantity = Math.max(1, item.quantity + change)
        try {
            await updateOrderItem(item.id, { quantity: newQuantity })
            setSelectedItems((prev) =>
                prev.map((selected) =>
                    selected.id === item.id ? { ...selected, quantity: newQuantity } : selected
                )
            )
        } catch (error) {
            console.error('Error updating quantity:', error)
        }
    }

    const handleDelete = async (itemId) => {
        try {
            await deleteOrderItem(itemId)
            setSelectedItems((prev) => prev.filter((i) => i.id !== itemId))
        } catch (error) {
            console.error('Error deleting item:', error)
        }
    }

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            alert("Please select at least one item to checkout!");
            return;
        }

        try {
            // Assume all selected items belong to the same pending order
            const orderId = orders.find(order => 
                order.items.some(item => selectedItems.some(sel => sel.id === item.id))
            ).id;

            const response = await api.post(`api/payment/create/${orderId}/`, {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // if using token auth
                    },
                }
            );

            // Redirect user to PayMongo checkout page
            window.location.href = response.data.checkout_url;

        } catch (error) {
            console.error("Error creating payment:", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };



    useEffect(() => {
        const totalAmount = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        setTotal(totalAmount)
    }, [selectedItems])

    if (!orders || orders.length === 0)
        return <p className="text-center text-gray-500 mt-10 min-h-screen flex items-center justify-center">Your cart is empty 🛒</p>

    return (
        <>  
            <Header></Header>
            <section className="max-w-6xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
                <Link to="/" className='flex gap-3 items-center text-2xl mb-4'>
                    <IoIosArrowRoundBack size={30} /> Back
                </Link>
                <h2 className="text-3xl font-bold mb-6 text-blue-600">Your Cart</h2>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Scrollable Products */}
                    <div className="lg:w-3/4 bg-gray-50 p-5 rounded-lg shadow-inner max-h-[70vh] overflow-y-auto space-y-4">
                        {orders.map((order) =>
                            order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelect(item.id, item.price, item.quantity)}
                                            checked={selectedItems.some((i) => i.id === item.id)}
                                            className="w-5 h-5 accent-blue-600"
                                        />
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-24 h-24 rounded-lg object-cover border"
                                        />
                                        <Link  to={`/products/${item.product.id}`}>
                                            <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 w-60">{item.product.description}</p>
                                        </Link>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <p className="font-semibold text-blue-600">
                                            ₱ {Number(item.price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>


                                        <div className="flex items-center border rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => handleQuantityChange(item, -1)}
                                                className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 text-gray-800">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item, 1)}
                                                className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                                        >
                                            <FaTrashAlt /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:w-1/4 bg-gray-100 p-5 rounded-lg shadow-inner flex flex-col justify-between sticky top-20 h-[fit-content]">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Summary</h3>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Selected Items:</span>
                                <span className="font-semibold">{selectedItems.length}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold text-blue-600 text-lg">₱ {total.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                        <button onClick={handleCheckout} className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                            Checkout
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductCart
