import React, { useState } from 'react'
import { Plus, Minus, Leaf, Flame } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

const CATEGORY_EMOJIS = {
  'MOMOS': '🥟',
  'WINGS': '🍗',
  'LOADED FRIES': '🍟',
  'FULLY LOADED': '🔥',
  'BURGER': '🍔',
  'FRIES BURRITO': '🌯',
  'ROLLS & WRAPS': '🫔',
  "SIZZLIN' QUESADILLAS": '🫕',
  'MAGGIE BOWL MADNESS': '🍜',
}

export default function MenuCard({ item }) {
  const { items, addItem, updateQty } = useCart()
  const cartItem = items.find(i => i.id === item.id)
  const qty = cartItem?.quantity || 0

  const handleAdd = () => {
    addItem(item)
    toast.success(`${item.name} added!`, { duration: 1500 })
  }

  const handleIncrease = () => updateQty(item.id, qty + 1)
  const handleDecrease = () => updateQty(item.id, qty - 1)

  return (
    <div className="card group animate-fade-in">
      {/* Top Color Bar */}
      <div className={`h-1 w-full ${item.isVeg ? 'bg-green-500' : 'bg-brand-red'}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 mb-1">
              {item.isVeg
                ? <Leaf size={13} className="text-green-500 flex-shrink-0" />
                : <Flame size={13} className="text-brand-red flex-shrink-0" />
              }
              {item.badge && (
                <span className="badge bg-brand-gold text-brand-dark text-[10px]">
                  {item.badge}
                </span>
              )}
            </div>
            <h3 className="font-bold text-white text-base leading-tight group-hover:text-brand-gold transition-colors">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-gray-500 text-sm mt-1 leading-tight">{item.description}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display text-2xl text-brand-gold leading-none">₹{item.price}</div>
          </div>
        </div>

        {/* Add to cart */}
        <div className="mt-3">
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 bg-brand-smoke hover:bg-brand-red border border-gray-700 hover:border-brand-red text-white font-bold py-2.5 rounded-lg transition-all duration-200 active:scale-95"
            >
              <Plus size={16} />
              <span className="tracking-wide">ADD</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-brand-red rounded-lg overflow-hidden">
              <button onClick={handleDecrease} className="px-4 py-2.5 hover:bg-red-700 transition-colors active:scale-95 font-bold text-lg">
                <Minus size={16} />
              </button>
              <span className="font-display text-xl text-white tracking-wider">{qty}</span>
              <button onClick={handleIncrease} className="px-4 py-2.5 hover:bg-red-700 transition-colors active:scale-95 font-bold text-lg">
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
