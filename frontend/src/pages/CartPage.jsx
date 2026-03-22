import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, updateQty, removeItem, totalItems, totalAmount } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Navbar />
        <div className="pt-28 flex flex-col items-center justify-center px-4 text-center">
          <ShoppingBag size={80} className="text-brand-smoke mb-6" />
          <h2 className="font-display text-4xl text-white tracking-wider mb-2">Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Add some delicious items from our menu!</p>
          <Link to="/" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    )
  }

  const delivery = 0 // Free delivery / dine-in
  const gst = Math.round(totalAmount * 0.05)
  const grandTotal = totalAmount + gst

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-32">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-display text-4xl text-white tracking-wider">YOUR CART</h1>
          <span className="bg-brand-red text-white text-sm font-bold px-3 py-1 rounded-full">{totalItems} items</span>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex items-center gap-4 animate-slide-up">
              <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-500' : 'bg-brand-red'}`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-base truncate">{item.name}</h3>
                <p className="text-brand-gold font-display text-xl">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-brand-smoke hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-display text-xl text-white w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-brand-smoke hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 rounded-lg bg-brand-smoke hover:bg-red-900 text-red-400 flex items-center justify-center transition-colors ml-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="text-right w-16 flex-shrink-0">
                <p className="font-bold text-white">₹{(item.price * item.quantity).toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="card p-5 mb-6">
          <h3 className="font-display text-2xl text-white tracking-wider mb-4">BILL SUMMARY</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Item Total</span>
              <span className="text-white font-semibold">₹{totalAmount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST (5%)</span>
              <span className="text-white font-semibold">₹{gst}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span>
              <span className="text-green-400 font-semibold">FREE</span>
            </div>
            <div className="border-t border-brand-smoke pt-3 mt-3 flex justify-between">
              <span className="font-display text-xl text-white tracking-wide">TOTAL</span>
              <span className="font-display text-2xl text-brand-gold">₹{grandTotal.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/checkout', { state: { gst, grandTotal } })}
          className="w-full btn-primary text-lg py-4 rounded-xl"
        >
          Proceed to Checkout → ₹{grandTotal.toFixed(0)}
        </button>
      </div>
    </div>
  )
}
