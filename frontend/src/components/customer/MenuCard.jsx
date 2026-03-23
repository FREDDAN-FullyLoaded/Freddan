import React from 'react'
import { Plus, Minus, Leaf, Flame } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

// ── Real food images mapped by item name keywords ──
const getFoodImage = (name, category) => {
  const n = name.toLowerCase()

  // FULLY LOADED
  if (n.includes('crispy chicken fully')) return 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80'
  if (n.includes('prawn fully') || n.includes('crispy prawn fully')) return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80'
  if (n.includes('paneer fully')) return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80'

  // BURGERS
  if (n.includes('butter chicken burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
  if (n.includes('zinger')) return 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80'
  if (n.includes('nashville')) return 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80'
  if (n.includes('prawn burger') || n.includes('prawn') && n.includes('burger')) return 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80'
  if (n.includes('paneer') && n.includes('burger')) return 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80'

  // WINGS
  if (n.includes('chilli garlic') && n.includes('wing')) return 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80'
  if (n.includes('buffalo')) return 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80'
  if (n.includes('bbq') && n.includes('wing')) return 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80'
  if (n.includes('nashville') && n.includes('wing')) return 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80'
  if (n.includes('dynamic') && n.includes('wing')) return 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=400&q=80'

  // LOADED FRIES
  if (n.includes('unlimited')) return 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80'
  if (n.includes('prawn') && n.includes('fries')) return 'https://images.unsplash.com/photo-1598182198343-53c13f4e1a1f?w=400&q=80'
  if (n.includes('paneer') && n.includes('fries')) return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'
  if (n.includes('loaded fries') || n.includes('chicken') && n.includes('fries')) return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'

  // MOMOS
  if (n.includes('chilli garlic') && n.includes('momo')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80'
  if (n.includes('butter') && n.includes('momo')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80'
  if (n.includes('momo')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80'

  // FRIES BURRITO
  if (n.includes('prawn') && n.includes('burrito')) return 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&q=80'
  if (n.includes('burrito')) return 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80'

  // ROLLS & WRAPS
  if (n.includes('prawn') && n.includes('wrap')) return 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80'
  if (n.includes('fajitha') || n.includes('mexican')) return 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&q=80'
  if (n.includes('wrap') || n.includes('roll')) return 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=400&q=80'

  // QUESADILLAS
  if (n.includes('prawn') && n.includes('quesadilla')) return 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80'
  if (n.includes('quesadilla')) return 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80'

  // MAGGIE
  if (n.includes('maggie') || n.includes('egg')) return 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80'

  // Category fallbacks
  const fallbacks = {
    'BURGER': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'WINGS': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80',
    'LOADED FRIES': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'FULLY LOADED': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
    'MOMOS': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80',
    'FRIES BURRITO': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
    'ROLLS & WRAPS': 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=400&q=80',
    "SIZZLIN' QUESADILLAS": 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
    'MAGGIE BOWL MADNESS': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80',
  }
  return fallbacks[category] || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
}

export default function MenuCard({ item }) {
  const { items, addItem, updateQty } = useCart()
  const cartItem = items.find(i => i.id === item.id)
  const qty = cartItem?.quantity || 0
  const foodImage = item.imageUrl || getFoodImage(item.name, item.category)

  const handleAdd = () => {
    addItem(item)
    toast.success(`${item.name} added! 🛒`, { duration: 1500 })
  }
  const handleIncrease = () => updateQty(item.id, qty + 1)
  const handleDecrease = () => updateQty(item.id, qty - 1)

  return (
    <div className="card group animate-fade-in flex flex-col overflow-hidden">

      {/* ── Food Image ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '160px' }}>
        <img
          src={foodImage}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' }}
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-transparent" />

        {/* Veg/Non-veg dot — top left */}
        <div className={`absolute top-2 left-2 w-5 h-5 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500 bg-brand-dark/80' : 'border-brand-red bg-brand-dark/80'}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-brand-red'}`} />
        </div>

        {/* Badge — top right */}
        {item.badge && (
          <span className="absolute top-2 right-2 bg-brand-gold text-brand-dark text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-lg">
            {item.badge}
          </span>
        )}

        {/* Price on image bottom right */}
        <div className="absolute bottom-2 right-2 bg-brand-dark/80 backdrop-blur rounded-lg px-2 py-0.5">
          <span className="font-display text-lg text-brand-gold leading-none">₹{item.price}</span>
        </div>
      </div>

      {/* ── Info + Button ── */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-white text-sm leading-tight group-hover:text-brand-gold transition-colors line-clamp-2 mb-1">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-gray-500 text-xs leading-tight line-clamp-1 mb-2">{item.description}</p>
        )}

        {/* Add to cart */}
        <div className="mt-auto">
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-1.5 bg-brand-smoke hover:bg-brand-red border border-gray-700 hover:border-brand-red text-white font-bold py-2 rounded-lg transition-all duration-200 active:scale-95 text-sm"
            >
              <Plus size={14} />
              <span className="tracking-wide">ADD</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-brand-red rounded-lg overflow-hidden">
              <button onClick={handleDecrease} className="px-3 py-2 hover:bg-red-700 transition-colors active:scale-95 font-bold">
                <Minus size={14} />
              </button>
              <span className="font-display text-lg text-white tracking-wider">{qty}</span>
              <button onClick={handleIncrease} className="px-3 py-2 hover:bg-red-700 transition-colors active:scale-95 font-bold">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
