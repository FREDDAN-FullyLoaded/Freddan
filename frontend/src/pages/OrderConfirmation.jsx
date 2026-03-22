import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, MapPin, Phone } from 'lucide-react'
import Navbar from '../components/shared/Navbar'

export default function OrderConfirmation() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-28 pb-16 text-center">

        {/* Success Animation */}
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <CheckCircle size={52} className="text-green-400" />
        </div>

        <h1 className="font-display text-5xl text-white tracking-wider mb-2">ORDER PLACED!</h1>
        <p className="text-brand-gold font-bold text-lg mb-1">🔥 Fully Loaded is preparing your order</p>
        <p className="text-gray-500 mb-2">Order #{id}</p>
        <p className="text-gray-400 text-sm mb-8">
          You'll receive a confirmation on your phone. Our team has been notified!
        </p>

        {/* Shop info */}
        <div className="card p-5 mb-8 text-left">
          <h3 className="font-display text-xl text-white tracking-wider mb-3">PICK UP FROM</h3>
          <div className="flex items-start gap-3 text-gray-400 text-sm mb-2">
            <MapPin size={16} className="text-brand-red mt-0.5 flex-shrink-0" />
            <span>Old No 74, New No 20, Brindavan St, near Duraiswamy Subway, West Mambalam, Chennai – 600033</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <Phone size={16} className="text-brand-red flex-shrink-0" />
            <a href="tel:8608227548" className="hover:text-brand-gold transition-colors">+91 86082 27548</a>
          </div>
          <a
            href="https://maps.google.com/?q=Freddan+Fully+Loaded+West+Mambalam+Chennai"
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full btn-outline text-sm py-2 rounded-lg flex items-center justify-center gap-2"
          >
            📍 Get Directions on Google Maps
          </a>
        </div>

        <Link to="/" className="btn-primary px-8 py-3 rounded-xl text-lg">
          Order More 🍗
        </Link>
      </div>
    </div>
  )
}
