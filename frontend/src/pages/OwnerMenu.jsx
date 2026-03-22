import React, { useEffect, useState } from 'react'
import OwnerLayout from '../components/owner/OwnerLayout'
import { getAllMenuAdmin, addMenuItem, updateMenuItem, updateMenuPrice, toggleAvailability, deleteMenuItem } from '../utils/api'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, IndianRupee, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = [
  'MOMOS', 'WINGS', 'LOADED FRIES', 'FULLY LOADED',
  'BURGER', 'FRIES BURRITO', 'ROLLS & WRAPS', "SIZZLIN' QUESADILLAS", 'MAGGIE BOWL MADNESS'
]

const emptyForm = { name: '', category: 'BURGER', price: '', description: '', badge: '', isVeg: false }

export default function OwnerMenu() {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingPrice, setEditingPrice] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [filterCat, setFilterCat] = useState('ALL')
  const [saving, setSaving] = useState(false)

  const loadMenu = () => {
    getAllMenuAdmin().then(res => setMenu(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { loadMenu() }, [])

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true) }
  const openEdit = (item) => {
    setEditItem(item)
    setForm({ name: item.name, category: item.category, price: item.price, description: item.description || '', badge: item.badge || '', isVeg: item.isVeg })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return }
    setSaving(true)
    try {
      if (editItem) {
        await updateMenuItem(editItem.id, { ...form, price: parseFloat(form.price), available: editItem.available })
        toast.success('Item updated!')
      } else {
        await addMenuItem({ ...form, price: parseFloat(form.price), available: true })
        toast.success('Item added!')
      }
      setShowModal(false)
      loadMenu()
    } catch { toast.error('Failed to save.') }
    finally { setSaving(false) }
  }

  const handleToggle = async (id) => {
    try {
      await toggleAvailability(id)
      loadMenu()
    } catch { toast.error('Failed to toggle') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try {
      await deleteMenuItem(id)
      toast.success('Deleted!')
      loadMenu()
    } catch { toast.error('Failed to delete') }
  }

  const handlePriceSave = async (id) => {
    if (!newPrice || isNaN(parseFloat(newPrice))) { toast.error('Enter valid price'); return }
    try {
      await updateMenuPrice(id, parseFloat(newPrice))
      toast.success('Price updated!')
      setEditingPrice(null)
      loadMenu()
    } catch { toast.error('Failed to update price') }
  }

  const filtered = filterCat === 'ALL' ? menu : menu.filter(i => i.category === filterCat)

  return (
    <OwnerLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-5xl text-white tracking-wider">MENU MANAGER</h1>
            <p className="text-gray-500 mt-1">{menu.length} total items</p>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Item
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {['ALL', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                filterCat === cat ? 'bg-brand-red text-white' : 'bg-brand-smoke text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading menu...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-smoke text-gray-500 text-sm">
                    <th className="text-left px-4 py-3 font-semibold">Item</th>
                    <th className="text-left px-4 py-3 font-semibold">Category</th>
                    <th className="text-left px-4 py-3 font-semibold">Price</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-smoke">
                  {filtered.map(item => (
                    <tr key={item.id} className="hover:bg-brand-smoke/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-500' : 'bg-brand-red'}`} />
                          <div>
                            <div className="font-semibold text-white text-sm">{item.name}</div>
                            {item.badge && <span className="text-brand-gold text-xs">{item.badge}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{item.category}</td>
                      <td className="px-4 py-3">
                        {editingPrice === item.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              className="w-20 bg-brand-smoke border border-brand-red rounded px-2 py-1 text-white text-sm"
                              value={newPrice}
                              onChange={e => setNewPrice(e.target.value)}
                              autoFocus
                            />
                            <button onClick={() => handlePriceSave(item.id)} className="text-green-400 hover:text-green-300"><Check size={16} /></button>
                            <button onClick={() => setEditingPrice(null)} className="text-red-400 hover:text-red-300"><X size={16} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingPrice(item.id); setNewPrice(item.price.toString()) }}
                            className="flex items-center gap-1 text-brand-gold hover:text-yellow-300 font-display text-lg transition-colors"
                          >
                            ₹{item.price}
                            <Pencil size={12} className="text-gray-600" />
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleToggle(item.id)} className="flex items-center gap-1.5 transition-colors">
                          {item.available
                            ? <><ToggleRight size={22} className="text-green-400" /><span className="text-green-400 text-sm font-semibold">Active</span></>
                            : <><ToggleLeft size={22} className="text-gray-600" /><span className="text-gray-600 text-sm font-semibold">Hidden</span></>
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-white hover:bg-brand-smoke rounded-lg transition-all">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-brand-smoke rounded-2xl w-full max-w-md p-6 animate-bounce-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-3xl text-white tracking-wider">{editItem ? 'EDIT ITEM' : 'ADD ITEM'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={22} /></button>
            </div>
            <div className="space-y-3">
              <input className="input-field" placeholder="Item Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input className="input-field" type="number" placeholder="Price (₹) *" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              <input className="input-field" placeholder="Description (optional)" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <input className="input-field" placeholder="Badge e.g. Bestseller, Signature" value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isVeg} onChange={e => setForm(f => ({ ...f, isVeg: e.target.checked }))} className="w-4 h-4 accent-green-500" />
                <span className="text-gray-300 font-semibold">Vegetarian</span>
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 btn-outline py-2.5 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary py-2.5 rounded-lg disabled:opacity-60">
                {saving ? 'Saving...' : editItem ? 'Update' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  )
}
