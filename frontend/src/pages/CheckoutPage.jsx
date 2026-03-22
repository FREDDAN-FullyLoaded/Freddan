import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreditCard, Smartphone, ArrowLeft, CheckCircle } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../utils/api'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { id: 'GPAY', label: 'Google Pay', icon: '🔵', color: 'border-blue-500' },
  { id: 'PHONEPE', label: 'PhonePe', icon: '🟣', color: 'border-purple-500' },
  { id: 'CARD', label: 'Credit / Debit Card', icon: '💳', color: 'border-brand-gold' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, totalAmount, clearCart } = useCart()
  const { gst = 0, grandTotal = totalAmount } = location.state || {}

  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [paymentMethod, setPaymentMethod] = useState('GPAY')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit mobile number'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setLoading(true)
    try {
      const orderPayload = {
        customerName: form.name,
        customerPhone: form.phone,
        customerAddress: form.address,
        orderNotes: form.notes,
        paymentMethod,
        paymentStatus: 'PENDING',
        totalAmount: grandTotal,
        items: items.map(i => ({
          menuItemId: i.id,
          menuItemName: i.name,
          quantity: i.quantity,
          price: i.price,
        }))
      }

      const res = await placeOrder(orderPayload)
      clearCart()
      toast.success('Order placed successfully! 🎉')
      navigate(`/order-confirmation/${res.data.id}`)
    } catch (err) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-display text-4xl text-white tracking-wider">CHECKOUT</h1>
        </div>

        {/* Customer Details */}
        <div className="card p-5 mb-5">
          <h2 className="font-display text-2xl text-white tracking-wider mb-4">YOUR DETAILS</h2>
          <div className="space-y-3">
            <div>
              <input
                className={`input-field ${errors.name ? 'border-brand-red' : ''}`}
                placeholder="Your Name *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              {errors.name && <p className="text-brand-red text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                className={`input-field ${errors.phone ? 'border-brand-red' : ''}`}
                placeholder="Mobile Number * (10 digits)"
                value={form.phone}
                maxLength={10}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/, '') }))}
              />
              {errors.phone && <p className="text-brand-red text-xs mt-1">{errors.phone}</p>}
            </div>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Delivery Address (optional)"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            />
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Special Instructions (optional)"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="card p-5 mb-5">
          <h2 className="font-display text-2xl text-white tracking-wider mb-4">PAYMENT METHOD</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(pm => (
              <button
                key={pm.id}
                onClick={() => setPaymentMethod(pm.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === pm.id
                    ? `${pm.color} bg-brand-smoke`
                    : 'border-brand-smoke hover:border-gray-600'
                }`}
              >
                <span className="text-2xl">{pm.icon}</span>
                <span className="font-bold text-white tracking-wide">{pm.label}</span>
                {paymentMethod === pm.id && <CheckCircle size={20} className="text-brand-gold ml-auto" />}
              </button>
            ))}
          </div>

          {/* Payment QR Placeholder */}
          <div className="mt-4 p-4 bg-brand-smoke rounded-xl text-center border border-dashed border-gray-700">
            <p className="text-gray-500 text-sm font-semibold">
              📲 {paymentMethod === 'CARD' ? 'Card payment' : `Scan ${paymentMethod} QR`} will be shown here after Razorpay integration
            </p>
            <p className="text-gray-700 text-xs mt-1">Configure your payment gateway credentials to activate</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card p-5 mb-6">
          <h2 className="font-display text-2xl text-white tracking-wider mb-3">ORDER TOTAL</h2>
          <div className="space-y-1 text-sm text-gray-400 mb-3">
            {items.map(i => (
              <div key={i.id} className="flex justify-between">
                <span>{i.name} × {i.quantity}</span>
                <span className="text-white">₹{(i.price * i.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-smoke pt-3 flex justify-between">
            <span className="font-display text-xl text-white">TOTAL (incl. GST)</span>
            <span className="font-display text-2xl text-brand-gold">₹{grandTotal.toFixed(0)}</span>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full btn-primary text-lg py-4 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Placing Order...' : `🔥 Place Order · ₹${grandTotal.toFixed(0)}`}
        </button>
      </div>
    </div>
  )
}
