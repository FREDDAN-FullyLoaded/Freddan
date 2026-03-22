import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, ClipboardList, LogOut, Menu } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/owner', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/owner/menu', icon: UtensilsCrossed, label: 'Menu Manager' },
  { path: '/owner/orders', icon: ClipboardList, label: 'Orders' },
]

export default function OwnerLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('freddan_owner')
    navigate('/owner/login')
  }

  const isActive = (item) => item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path)

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-brand-charcoal border-r border-brand-smoke z-50 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex`}>
        <div className="p-4 border-b border-brand-smoke">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Freddan" className="h-12 w-auto object-contain rounded-lg" />
            <div className="text-brand-gold text-xs font-bold tracking-wider mt-0.5">Owner Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = isActive(item)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold tracking-wide transition-all ${
                  active
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                    : 'text-gray-400 hover:text-white hover:bg-brand-smoke'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-brand-smoke">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/30 font-semibold tracking-wide w-full transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden bg-brand-charcoal border-b border-brand-smoke px-4 py-2 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
          <img src="/logo.png" alt="Freddan" className="h-10 w-auto object-contain rounded-lg" />
        </div>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
