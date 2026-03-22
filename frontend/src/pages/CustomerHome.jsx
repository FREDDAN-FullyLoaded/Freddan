import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, MapPin, Phone } from 'lucide-react'
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

const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
  'https://images.unsplash.com/photo-1598182198343-53c13f4e1a1f?w=500&q=80',
  'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&q=80',
  'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=500&q=80',
]

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

      {/* ═══ HERO ═══ */}
      <div className="relative pt-16 overflow-hidden">

        {/* Full background food mosaic */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-3 h-full">
            {FOOD_IMAGES.map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-brand-dark/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-transparent to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-red/15 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur border border-brand-red/40 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase">Chennai's Finest Street Food</span>
          </div>

          {/* Logo — circular with glow */}
          <div className="relative inline-block mb-6 animate-bounce-in">
            <div className="absolute inset-0 rounded-full bg-brand-red/25 scale-125 blur-2xl" />
            <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 scale-[1.2]" />
            <div className="absolute inset-0 rounded-full border-2 border-brand-red/40 scale-[1.1]" />
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-brand-red shadow-2xl shadow-brand-red/60 mx-auto">
              <img src="/logo.png" alt="Freddan Fully Loaded" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Brand */}
          <h1
            className="font-display text-7xl md:text-9xl text-white tracking-[0.12em] leading-none animate-fade-in"
            style={{ textShadow: '0 0 60px rgba(200,16,46,0.5), 0 4px 20px rgba(0,0,0,0.8)' }}
          >
            FREDDAN
          </h1>

          <div className="flex items-center justify-center gap-3 mt-2 mb-6">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-brand-red" />
            <p className="font-display text-xl md:text-3xl text-brand-red tracking-[0.35em]">FULLY LOADED</p>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-brand-red" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['🔥 Crispy Chicken', '🍟 Loaded Fries', '🍔 Burgers', '🥟 Momos', '🌯 Wraps', '🫕 Quesadillas'].map(tag => (
              <span key={tag} className="bg-white/5 backdrop-blur border border-white/10 text-gray-300 text-sm font-semibold px-4 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-9">
            {[['35+', 'Menu Items'], ['⭐ 4.8', 'Rating'], ['🔥 Hot', 'Always Fresh']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-brand-gold leading-none">{val}</div>
                <div className="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <a href="#menu" className="btn-primary px-10 py-3.5 rounded-full text-lg flex items-center gap-2 shadow-xl shadow-brand-red/40">
              🍗 Order Now
            </a>
            <a
              href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
              target="_blank" rel="noreferrer"
              className="border border-gray-600 bg-white/5 backdrop-blur text-gray-300 hover:border-brand-gold hover:text-brand-gold font-bold px-10 py-3.5 rounded-full text-lg transition-all flex items-center gap-2"
            >
              <MapPin size={18} /> Find Us
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm flex-wrap">
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-red" />West Mambalam, Chennai</span>
            <span className="text-gray-700">•</span>
            <a href="tel:8608227548" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={13} className="text-brand-red" />+91 86082 27548
            </a>
          </div>
        </div>

        {/* Food image strip */}
        <div className="relative z-10 flex overflow-hidden h-32 md:h-44">
          {FOOD_IMAGES.map((src, i) => (
            <div key={i} className="flex-1 relative overflow-hidden group cursor-pointer">
              <img src={src} alt="food" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ CATEGORY FILTER ═══ */}
      <div id="menu" className="sticky top-16 z-40 bg-brand-dark/95 backdrop-blur border-b border-brand-smoke">
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

      {/* ═══ MENU GRID ═══ */}
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

      {/* ═══ FLOATING CART ═══ */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 animate-slide-up">
          <Link to="/cart"
            className="flex items-center justify-between bg-brand-red hover:bg-red-700 text-white rounded-2xl px-6 py-4 w-full max-w-sm shadow-2xl shadow-brand-red/40 transition-all active:scale-95 animate-pulse-red">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span className="bg-white text-brand-red text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{totalItems}</span>
              <span className="font-bold tracking-wide">View Cart</span>
            </div>
            <span className="font-display text-xl tracking-wider">₹{totalAmount.toFixed(0)}</span>
          </Link>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-brand-smoke mt-8 py-10 text-center bg-brand-charcoal">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-red mx-auto mb-3 shadow-lg shadow-brand-red/30">
            <img src="/logo.png" alt="Freddan" className="w-full h-full object-cover" />
          </div>
          <p className="font-display text-3xl text-white tracking-widest mb-0.5">FREDDAN</p>
          <p className="text-brand-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Fully Loaded</p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-2">
            Old No 74, New No 20, Brindavan St, near Duraiswamy Subway,<br />
            West Mambalam, Chennai – 600033
          </p>
          <a href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
            target="_blank" rel="noreferrer"
            className="text-brand-gold hover:underline text-sm inline-block">
            📍 Get Directions on Google Maps
          </a>
          <div className="mt-6 pt-4 border-t border-brand-smoke text-gray-800 text-xs">
            <Link to="/owner/login" className="hover:text-gray-600 transition-colors">Owner Access</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
