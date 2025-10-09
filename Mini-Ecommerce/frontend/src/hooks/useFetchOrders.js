import React,  { useState, useEffect } from 'react'
import api from '../api/api'

const usefetchOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await api.get('api/orders/');
            const pendingOrders = response.data.filter(order => order.status === 'Pending');
            setOrders(pendingOrders);
        };
        fetchOrders();
    }, []);


    const updateOrderItem = async (itemId, data) => {
        await api.patch(`api/order-items/${itemId}/`, data);
        setOrders((prevOrders) =>
            prevOrders.map((order) => ({
                ...order,
                items: order.items.map((item) =>
                    item.id === itemId ? { ...item, ...data } : item
                ),
            }))
        )
    }


    const deleteOrderItem = async (itemId) => {
        await api.delete(`api/order-items/${itemId}/`);
        setOrders((prevOrders) =>
            prevOrders.map((order) => ({
                ...order,
                items: order.items.filter((item) => item.id !== itemId),
            }))
        )
    }


    return { orders, updateOrderItem, deleteOrderItem }
}

export default usefetchOrders
