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
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85',
  'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=85',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=85',
  'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=85',
  'https://images.unsplash.com/photo-1598182198343-53c13f4e1a1f?w=600&q=85',
  'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=600&q=85',
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

      {/* ═══════════════════════════════
          HERO SECTION
      ═══════════════════════════════ */}
      <div className="relative pt-16 overflow-hidden">

        {/* === Full-bleed food photo background === */}
        <div className="absolute inset-0 z-0">
          {/* 2×3 food photo grid */}
          <div className="grid grid-cols-3 grid-rows-2 h-full">
            {FOOD_IMAGES.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* Multi-layer dark overlay */}
          <div className="absolute inset-0 bg-brand-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-transparent to-brand-dark/70" />
          {/* Warm red center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-red/12 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* === Hero Content === */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-14 pb-12 flex flex-col items-center text-center">

          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-brand-red/40 rounded-full px-5 py-2 mb-10">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-brand-gold font-bold tracking-[0.25em] text-xs uppercase">Chennai's Finest Street Food</span>
          </div>

          {/* === LOGO — full wide, on white pill, with glow === */}
          <div className="relative mb-8 animate-bounce-in">
            {/* Glow behind logo */}
            <div className="absolute -inset-6 bg-brand-red/20 rounded-3xl blur-2xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 via-brand-gold/20 to-brand-red/30 rounded-2xl blur-lg" />
            {/* White background pill for logo */}
            <div className="relative bg-white rounded-2xl px-8 py-5 shadow-2xl shadow-brand-red/50">
              <img
                src="/logo.png"
                alt="Freddan Fully Loaded"
                className="h-28 md:h-36 w-auto object-contain"
              />
            </div>
          </div>

          {/* Tagline under logo */}
          <p className="text-gray-300 text-base md:text-lg font-semibold tracking-wide mb-6 max-w-xl">
            West Mambalam's go-to spot for <span className="text-brand-gold">crispy chicken</span>, <span className="text-brand-gold">loaded fries</span>, juicy burgers & refreshing drinks
          </p>

          {/* Food tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { icon: '🔥', label: 'Crispy Chicken' },
              { icon: '🍟', label: 'Loaded Fries' },
              { icon: '🍔', label: 'Burgers' },
              { icon: '🦐', label: 'Prawn Bites' },
              { icon: '🥤', label: 'Mojitos' },
              { icon: '🥛', label: 'Milkshakes' },
              { icon: '🥟', label: 'Momos' },
              { icon: '🌯', label: 'Wraps' },
            ].map(tag => (
              <span key={tag.label} className="bg-white/8 backdrop-blur border border-white/10 text-gray-200 text-sm font-semibold px-4 py-1.5 rounded-full hover:border-brand-red/40 hover:text-white transition-colors">
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 md:gap-20 mb-10">
            {[
              { value: '35+', label: 'Menu Items' },
              { value: '⭐ 4.8', label: 'Google Rating' },
              { value: '🔥 Hot', label: 'Always Fresh' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-brand-gold leading-none">{value}</div>
                <div className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href="#menu"
              className="btn-primary px-10 py-4 rounded-full text-lg flex items-center gap-2 shadow-xl shadow-brand-red/40 hover:scale-105 transition-transform"
            >
              🍗 Order Now
            </a>
            <a
              href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-gray-600 bg-white/5 backdrop-blur text-gray-200 hover:border-brand-gold hover:text-brand-gold font-bold px-10 py-4 rounded-full text-lg transition-all flex items-center gap-2"
            >
              <MapPin size={18} /> Find Us
            </a>
          </div>

          {/* Location + phone */}
          <div className="flex items-center justify-center gap-5 text-gray-500 text-sm flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-red flex-shrink-0" />
              West Mambalam, Chennai
            </span>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <a href="tel:8608227548" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={13} className="text-brand-red flex-shrink-0" />
              +91 86082 27548
            </a>
          </div>
        </div>

        {/* === Food image strip at base of hero === */}
        <div className="relative z-10 flex overflow-hidden" style={{ height: '150px' }}>
          {FOOD_IMAGES.map((src, i) => (
            <div key={i} className="flex-1 relative overflow-hidden group cursor-pointer">
              <img
                src={src}
                alt="food"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
              {/* Red line at top of strip */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════
          CATEGORY FILTER BAR
      ═══════════════════════════════ */}
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

      {/* ═══════════════════════════════
          MENU GRID
      ═══════════════════════════════ */}
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

      {/* ═══════════════════════════════
          FLOATING CART BUTTON
      ═══════════════════════════════ */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 animate-slide-up">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-brand-red hover:bg-red-700 text-white rounded-2xl px-6 py-4 w-full max-w-sm shadow-2xl shadow-brand-red/50 transition-all active:scale-95 animate-pulse-red"
          >
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

      {/* ═══════════════════════════════
          FOOTER
      ═══════════════════════════════ */}
      <footer className="border-t border-brand-smoke mt-8 py-12 bg-brand-charcoal">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Logo in footer */}
          <div className="inline-block bg-white rounded-xl px-6 py-3 mb-5 shadow-lg shadow-brand-red/20">
            <img src="/logo.png" alt="Freddan Fully Loaded" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-2 leading-relaxed">
            Old No 74, New No 20, Brindavan St,<br />
            near Duraiswamy Subway, West Mambalam,<br />
            Chennai – 600033
          </p>
          <a
            href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
            target="_blank"
            rel="noreferrer"
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
