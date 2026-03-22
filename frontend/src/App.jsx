import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CustomerHome from './pages/CustomerHome'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmation from './pages/OrderConfirmation'
import OwnerLogin from './pages/OwnerLogin'
import OwnerDashboard from './pages/OwnerDashboard'
import OwnerMenu from './pages/OwnerMenu'
import OwnerOrders from './pages/OwnerOrders'

const isOwnerLoggedIn = () => localStorage.getItem('freddan_owner') === 'true'

const ProtectedRoute = ({ children }) => {
  return isOwnerLoggedIn() ? children : <Navigate to="/owner/login" replace />
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<CustomerHome />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />

        {/* Owner */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/menu" element={<ProtectedRoute><OwnerMenu /></ProtectedRoute>} />
        <Route path="/owner/orders" element={<ProtectedRoute><OwnerOrders /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  )
}
