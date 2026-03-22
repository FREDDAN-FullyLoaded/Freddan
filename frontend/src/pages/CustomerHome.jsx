import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, MapPin, Phone, Star, ChevronDown } from 'lucide-react'
import Navbar from '../components/shared/Navbar'
import MenuCard from '../components/customer/MenuCard'
import { getMenu } from '../utils/api'
import { useCart } from '../context/CartContext'

const CATEGORIES = [
  'ALL', 'FULLY LOADED', 'BURGER', 'WINGS', 'LOADED FRIES',
  'MOMOS', 'FRIES BURRITO', 'ROLLS & WRAPS', "SIZZLIN' QUESADILLAS", 'MAGGIE BOWL MADNESS'
]

const CATEGORY_EMOJIS = {
  'ALL': '🍽️', 'FULLY LOADED': '🔥', 'BURGER': '🍔', 'WINGS': '🍗',
  'LOADED FRIES': '🍟', 'MOMOS': '🥟', 'FRIES BURRITO': '🌯',
  'ROLLS & WRAPS': '🫔', "SIZZLIN' QUESADILLAS": '🫕', 'MAGGIE BOWL MADNESS': '🍜'
}

export default function CustomerHome() {
  const [menu, setMenu] = useState([])
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const { totalItems, totalAmount } = useCart()

  useEffect(() => {
    getMenu()
      .then(res => setMenu(res.data))
      .catch(() => setMenu([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'ALL'
    ? menu
    : menu.filter(item => item.category === activeCategory)

  const groupedByCategory = CATEGORIES
    .filter(cat => cat !== 'ALL')
    .reduce((acc, cat) => {
      const items = menu.filter(i => i.category === cat)
      if (items.length) acc[cat] = items
      return acc
    }, {})

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-16 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
          <div className="text-center mb-2">
            <p className="text-brand-gold font-bold tracking-[0.3em] text-sm uppercase mb-4">Chennai's Finest</p>
            <img
              src="/logo.png"
              alt="Freddan Fully Loaded"
              className="h-36 md:h-48 w-auto object-contain mx-auto mb-4 drop-shadow-2xl"
            />
            <p className="text-gray-400 mt-3 font-body text-base max-w-md mx-auto">
              Signature Crispy Chicken • Loaded Fries • Premium Burgers
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
            <MapPin size={14} className="text-brand-red flex-shrink-0" />
            <span>West Mambalam, Chennai</span>
            <span className="text-gray-700">•</span>
            <Phone size={14} className="text-brand-red flex-shrink-0" />
            <a href="tel:8608227548" className="hover:text-brand-gold transition-colors">+91 86082 27548</a>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 bg-brand-dark/95 backdrop-blur border-b border-brand-smoke">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                    : 'bg-brand-smoke text-gray-400 hover:text-white hover:bg-brand-charcoal'
                }`}
              >
                <span>{CATEGORY_EMOJIS[cat]}</span>
                <span>{cat === 'ALL' ? 'All Items' : cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="card h-36 animate-pulse bg-brand-smoke" />
            ))}
          </div>
        ) : activeCategory === 'ALL' ? (
          Object.entries(groupedByCategory).map(([cat, items]) => (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{CATEGORY_EMOJIS[cat]}</span>
                <h2 className="font-display text-3xl text-white tracking-wider">{cat}</h2>
                <div className="flex-1 h-px bg-brand-smoke ml-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => <MenuCard key={item.id} item={item} />)}
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{CATEGORY_EMOJIS[activeCategory]}</span>
              <h2 className="font-display text-3xl text-white tracking-wider">{activeCategory}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => <MenuCard key={item.id} item={item} />)}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-16 text-lg">No items in this category.</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 animate-slide-up">
          <Link to="/cart" className="flex items-center justify-between bg-brand-red hover:bg-red-700 text-white rounded-2xl px-6 py-4 w-full max-w-sm shadow-2xl shadow-brand-red/40 transition-all active:scale-95 animate-pulse-red">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span className="bg-white text-brand-red text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
              <span className="font-bold tracking-wide">View Cart</span>
            </div>
            <span className="font-display text-xl tracking-wider">₹{totalAmount.toFixed(0)}</span>
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-brand-smoke mt-16 py-8 text-center">
        <p className="font-display text-2xl text-white tracking-widest mb-1">FREDDAN</p>
        <p className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-3">Fully Loaded</p>
        <p className="text-gray-600 text-sm">Old No 74, New No 20, Brindavan St, West Mambalam, Chennai – 600033</p>
        <p className="text-gray-600 text-sm mt-1">
          <a href="https://maps.google.com/?q=Freddan+Fully+Loaded+Chennai" target="_blank" rel="noreferrer" className="hover:text-brand-gold transition-colors">📍 Get Directions</a>
        </p>
        <div className="mt-4 text-gray-800 text-xs">
          <Link to="/owner/login" className="hover:text-gray-600 transition-colors">Owner Access</Link>
        </div>
      </footer>
    </div>
  )
}
