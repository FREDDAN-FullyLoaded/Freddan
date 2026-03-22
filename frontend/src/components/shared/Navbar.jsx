import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark border-b border-brand-smoke">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Freddan Fully Loaded"
            className="h-12 w-auto object-contain rounded-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-brand-gold font-semibold tracking-wide transition-colors">Menu</Link>
          <Link to="/cart" className="relative">
            <div className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-colors">
              <ShoppingCart size={18} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-brand-gold text-brand-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-charcoal border-t border-brand-smoke px-4 py-4 flex flex-col gap-3 animate-slide-up">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-brand-gold font-semibold py-2 tracking-wide">Menu</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-brand-gold font-semibold py-2 tracking-wide">Cart ({totalItems})</Link>
        </div>
      )}
    </nav>
  )
}
