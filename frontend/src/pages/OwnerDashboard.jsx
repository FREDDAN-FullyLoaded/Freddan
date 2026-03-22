import React, { useEffect, useState } from 'react'
import OwnerLayout from '../components/owner/OwnerLayout'
import { getAllOrders, getAllMenuAdmin } from '../utils/api'
import { ShoppingBag, UtensilsCrossed, TrendingUp, Clock } from 'lucide-react'

const STATUS_COLORS = {
  PLACED: 'bg-yellow-500/20 text-yellow-400',
  PREPARING: 'bg-blue-500/20 text-blue-400',
  READY: 'bg-green-500/20 text-green-400',
  DELIVERED: 'bg-gray-500/20 text-gray-400',
}

export default function OwnerDashboard() {
  const [orders, setOrders] = useState([])
  const [menuCount, setMenuCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllOrders(), getAllMenuAdmin()])
      .then(([ordersRes, menuRes]) => {
        setOrders(ordersRes.data)
        setMenuCount(menuRes.data.length)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const todayOrders = orders.filter(o => {
    const d = new Date(o.orderTime)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  })

  const totalRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0)
  const activeOrders = orders.filter(o => ['PLACED', 'PREPARING'].includes(o.orderStatus))

  const stats = [
    { label: "Today's Orders", value: todayOrders.length, icon: ShoppingBag, color: 'text-brand-gold' },
    { label: "Today's Revenue", value: `₹${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Active Orders', value: activeOrders.length, icon: Clock, color: 'text-blue-400' },
    { label: 'Menu Items', value: menuCount, icon: UtensilsCrossed, color: 'text-brand-red' },
  ]

  return (
    <OwnerLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-5xl text-white tracking-wider">DASHBOARD</h1>
          <p className="text-gray-500 mt-1">Welcome back, Owner 👑</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card p-5 animate-fade-in">
                <Icon size={24} className={`${stat.color} mb-3`} />
                <div className={`font-display text-3xl ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-500 text-sm font-semibold">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Recent Orders */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-brand-smoke flex items-center justify-between">
            <h2 className="font-display text-2xl text-white tracking-wider">RECENT ORDERS</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders yet.</div>
          ) : (
            <div className="divide-y divide-brand-smoke">
              {orders.slice(0, 10).map(order => (
                <div key={order.id} className="px-5 py-4 flex items-center justify-between hover:bg-brand-smoke/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">#{order.id}</span>
                      <span className={`badge ${STATUS_COLORS[order.orderStatus] || 'bg-gray-700 text-gray-300'}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {order.customerName} • {order.customerPhone}
                    </div>
                    <div className="text-gray-600 text-xs mt-0.5">
                      {new Date(order.orderTime).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl text-brand-gold">₹{order.totalAmount}</div>
                    <div className="text-gray-500 text-xs">{order.paymentMethod}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OwnerLayout>
  )
}
