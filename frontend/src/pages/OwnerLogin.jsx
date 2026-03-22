import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

const OWNER_USERNAME = 'freddan'
const OWNER_PASSWORD = 'freddan@2024'

export default function OwnerLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (form.username === OWNER_USERNAME && form.password === OWNER_PASSWORD) {
        localStorage.setItem('freddan_owner', 'true')
        toast.success('Welcome, Owner! 👑')
        navigate('/owner')
      } else {
        toast.error('Invalid credentials!')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <img
            src="/logo.jpg"
            alt="Freddan Fully Loaded"
            className="h-28 w-auto object-contain mx-auto mb-3"
            style={{ filter: 'drop-shadow(0 0 20px rgba(200,16,46,0.6))' }}
          />
          <p className="text-brand-gold font-bold tracking-widest text-sm uppercase">Owner Panel</p>
        </div>

        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          <div>
            <label className="text-gray-400 text-sm font-semibold mb-1.5 block">Username</label>
            <input
              className="input-field"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm font-semibold mb-1.5 block">Password</label>
            <div className="relative">
              <input
                className="input-field pr-12"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3 rounded-lg text-base disabled:opacity-60">
            {loading ? '🔓 Logging in...' : '🔐 Login as Owner'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-sm">
          <a href="/" className="hover:text-gray-500 transition-colors">← Back to Menu</a>
        </p>
      </div>
    </div>
  )
}
