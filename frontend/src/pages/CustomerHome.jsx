import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, MapPin, Phone, ChevronDown } from 'lucide-react'
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

      {/* ═══════════════════════════════════════
          FULL SCREEN HERO — burger hero image
      ═══════════════════════════════════════ */}
      <div className="relative pt-16">

        {/* Full screen hero image */}
        <div
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ minHeight: '92vh' }}
        >
          {/* THE HERO IMAGE — full bleed */}
          <img
            src="/hero-bg.jpg"
            alt="Freddan Fully Loaded"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gradient overlays — top + bottom fade to dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-transparent to-brand-dark" />

          {/* Very subtle dark center tint so text is readable */}
          <div className="absolute inset-0 bg-brand-dark/20" />

          {/* Hero text content — sits over image */}
          <div className="relative z-10 text-center px-4 flex flex-col items-center justify-end h-full pb-20 pt-32"
            style={{ minHeight: '92vh' }}>

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur border border-brand-red/50 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">Now Open • West Mambalam, Chennai</span>
            </div>

            {/* Tagline */}
            <h2 className="font-display text-3xl md:text-5xl text-white tracking-wider mb-3 drop-shadow-2xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
              Chennai's Most <span className="text-brand-gold">Loaded</span> Experience
            </h2>

            <p className="text-gray-200 text-base md:text-lg font-semibold mb-8 max-w-lg drop-shadow-lg"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              🔥 Crispy Chicken &nbsp;•&nbsp; 🍟 Loaded Fries &nbsp;•&nbsp; 🍔 Burgers &nbsp;•&nbsp; 🥤 Drinks
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <a
                href="#menu"
                className="btn-primary px-10 py-4 rounded-full text-lg flex items-center gap-2 shadow-2xl shadow-brand-red/50 hover:scale-105 transition-transform"
              >
                🍗 Order Now
              </a>
              <a
                href="tel:8608227548"
                className="border-2 border-white/40 bg-black/40 backdrop-blur text-white hover:border-brand-gold hover:text-brand-gold font-bold px-10 py-4 rounded-full text-lg transition-all flex items-center gap-2"
              >
                <Phone size={18} /> Call Us
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
              {[
                { value: '35+', label: 'Menu Items' },
                { value: '⭐ 4.8', label: 'Rating' },
                { value: '🔥 Hot', label: 'Always Fresh' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl text-brand-gold drop-shadow-lg">{value}</div>
                  <div className="text-gray-300 text-xs font-bold tracking-widest uppercase mt-1"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <a href="#menu" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-gold transition-colors animate-bounce">
              <span className="text-xs font-semibold tracking-widest uppercase">Explore Menu</span>
              <ChevronDown size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CATEGORY FILTER BAR
      ═══════════════════════════════════════ */}
      <div id="menu" className="sticky top-16 z-40 bg-brand-dark/96 backdrop-blur-md border-b border-brand-smoke">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105'
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

      {/* ═══════════════════════════════════════
          MENU GRID
      ═══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="card h-36 animate-pulse bg-brand-smoke" />
            ))}
          </div>
        ) : activeCategory === 'ALL' ? (
          Object.entries(groupedByCategory).map(([cat, items]) => (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{CATEGORY_EMOJIS[cat]}</span>
                <h2 className="font-display text-3xl text-white tracking-wider">{cat}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-brand-smoke to-transparent ml-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => <MenuCard key={item.id} item={item} />)}
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{CATEGORY_EMOJIS[activeCategory]}</span>
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

      {/* ═══════════════════════════════════════
          FLOATING CART
      ═══════════════════════════════════════ */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 animate-slide-up">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-brand-red hover:bg-red-700 text-white rounded-2xl px-6 py-4 w-full max-w-sm shadow-2xl shadow-brand-red/50 transition-all active:scale-95 animate-pulse-red"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span className="bg-white text-brand-red text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{totalItems}</span>
              <span className="font-bold tracking-wide">View Cart</span>
            </div>
            <span className="font-display text-xl tracking-wider">₹{totalAmount.toFixed(0)}</span>
          </Link>
        </div>
      )}

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="border-t border-brand-smoke mt-8 py-12 bg-brand-charcoal">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <img
            src="/logo.jpg"
            alt="Freddan Fully Loaded"
            className="h-20 w-auto object-contain mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 0 20px rgba(200,16,46,0.5))' }}
          />
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-2 leading-relaxed">
            Old No 74, New No 20, Brindavan St,<br />
            near Duraiswamy Subway, West Mambalam,<br />
            Chennai – 600033
          </p>
          <a
            href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
            target="_blank" rel="noreferrer"
            className="text-brand-gold hover:underline text-sm inline-flex items-center gap-1 mt-1"
          >
            <MapPin size={13} /> Get Directions on Google Maps
          </a>
          <div className="mt-8 pt-4 border-t border-brand-smoke/50 text-gray-800 text-xs">
            <Link to="/owner/login" className="hover:text-gray-600 transition-colors">Owner Access</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
