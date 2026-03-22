import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// MENU
export const getMenu = () => api.get('/menu')
export const getAllMenuAdmin = () => api.get('/menu/all')
export const addMenuItem = (item) => api.post('/menu', item)
export const updateMenuItem = (id, item) => api.put(`/menu/${id}`, item)
export const updateMenuPrice = (id, price) => api.patch(`/menu/${id}/price`, { price })
export const toggleAvailability = (id) => api.patch(`/menu/${id}/toggle`)
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`)

// ORDERS
export const placeOrder = (order) => api.post('/orders', order)
export const getAllOrders = () => api.get('/orders')
export const getOrdersByStatus = (status) => api.get(`/orders/status/${status}`)
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status })
export const updatePaymentStatus = (id, paymentStatus) => api.patch(`/orders/${id}/payment`, { paymentStatus })
