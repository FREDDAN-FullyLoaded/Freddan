import React, { useEffect, useState } from 'react'
import OwnerLayout from '../components/owner/OwnerLayout'
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from '../utils/api'
import { RefreshCw, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

const ORDER_STATUSES = ['PLACED', 'PREPARING', 'READY', 'DELIVERED']
const PAYMENT_STATUSES = ['PENDING', 'PAID', 'FAILED']

const STATUS_COLORS = {
  PLACED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  PREPARING: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  READY: 'bg-green-500/20 text-green-400 border-green-500/30',
  DELIVERED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const PAY_COLORS = {
  PENDING: 'text-yellow-500',
  PAID: 'text-green-400',
  FAILED: 'text-red-400',
}

export default function OwnerOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [expandedOrder, setExpandedOrder] = useState(null)

  const loadOrders = () => {
    setLoading(true)
    getAllOrders().then(res => setOrders(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { loadOrders() }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status)
      toast.success(`Order #${id} → ${status}`)
      loadOrders()
    } catch { toast.error('Failed to update') }
  }

  const handlePaymentChange = async (id, paymentStatus) => {
    try {
      await updatePaymentStatus(id, paymentStatus)
      toast.success('Payment status updated!')
      loadOrders()
    } catch { toast.error('Failed to update') }
  }

  const filtered = filterStatus === 'ALL' ? orders : orders.filter(o => o.orderStatus === filterStatus)

  return (
    <OwnerLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-5xl text-white tracking-wider">ORDERS</h1>
            <p className="text-gray-500 mt-1">{orders.length} total orders</p>
          </div>
          <button onClick={loadOrders} className="btn-outline flex items-center gap-2 py-2 px-4">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['ALL', ...ORDER_STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filterStatus === s ? 'bg-brand-red text-white' : 'bg-brand-smoke text-gray-400 hover:text-white'
              }`}
            >
              {s} {s !== 'ALL' && <span className="ml-1 opacity-70">({orders.filter(o => o.orderStatus === s).length})</span>}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="text-center text-gray-500 py-16">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-16">No orders found.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <div key={order.id} className="card overflow-hidden">
                {/* Order Header */}
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-brand-smoke/30"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-display text-2xl text-white">#{order.id}</span>
                    <span className={`badge border ${STATUS_COLORS[order.orderStatus]}`}>{order.orderStatus}</span>
                    <span className={`text-sm font-bold ${PAY_COLORS[order.paymentStatus]}`}>{order.paymentStatus}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="font-display text-xl text-brand-gold">₹{order.totalAmount}</div>
                      <div className="text-gray-500 text-xs">{order.paymentMethod}</div>
                    </div>
                    <ChevronDown size={18} className={`text-gray-500 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded */}
                {expandedOrder === order.id && (
                  <div className="border-t border-brand-smoke p-4 animate-slide-up">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-xs font-semibold mb-1">CUSTOMER</p>
                        <p className="font-bold text-white">{order.customerName}</p>
                        <p className="text-gray-400 text-sm">{order.customerPhone}</p>
                        {order.customerAddress && <p className="text-gray-500 text-sm">{order.customerAddress}</p>}
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-semibold mb-1">ORDER TIME</p>
                        <p className="text-gray-300 text-sm">{new Date(order.orderTime).toLocaleString('en-IN')}</p>
                        {order.orderNotes && (
                          <>
                            <p className="text-gray-500 text-xs font-semibold mt-2 mb-1">NOTES</p>
                            <p className="text-gray-400 text-sm">{order.orderNotes}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="bg-brand-smoke rounded-lg p-3 mb-4">
                      <p className="text-gray-500 text-xs font-semibold mb-2">ITEMS ORDERED</p>
                      <div className="space-y-1">
                        {order.items?.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.menuItemName} × {item.quantity}</span>
                            <span className="text-white font-semibold">₹{(item.price * item.quantity).toFixed(0)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-brand-gold">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3 flex-wrap">
                      <div className="flex-1 min-w-32">
                        <p className="text-gray-500 text-xs font-semibold mb-1.5">ORDER STATUS</p>
                        <select
                          className="input-field py-2 text-sm"
                          value={order.orderStatus}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                        >
                          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="flex-1 min-w-32">
                        <p className="text-gray-500 text-xs font-semibold mb-1.5">PAYMENT STATUS</p>
                        <select
                          className="input-field py-2 text-sm"
                          value={order.paymentStatus}
                          onChange={e => handlePaymentChange(order.id, e.target.value)}
                        >
                          {PAYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </OwnerLayout>
  )
}
