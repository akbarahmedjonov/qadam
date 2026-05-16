import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Pencil, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../utils/constants'

export default function ActivityModal() {
  const { modals, closeModal, addActivity, updateActivity } = useApp()

  const editing = modals.activity.editing
  const isEditing = !!editing

  const [name, setName] = useState('')
  const [category, setCategory] = useState('sports')
  const [schedule, setSchedule] = useState('')

  useEffect(() => {
    if (editing) {
      setName(editing.name || '')
      setCategory(editing.category || 'sports')
      setSchedule(editing.schedule || '')
    } else {
      setName('')
      setCategory('sports')
      setSchedule('')
    }
  }, [editing, modals.activity.open])

  const handleSubmit = (e) => {
    e.preventDefault()
    const activityData = { name: name.trim(), category, schedule: schedule.trim() }

    if (isEditing) {
      updateActivity(editing.id, activityData)
    } else {
      addActivity(activityData)
    }
    closeModal('activity')
  }

  return (
    <AnimatePresence>
      {modals.activity.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="card-custom w-full max-w-md p-0 overflow-hidden"
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h5 className="font-heading font-semibold mb-0 flex items-center gap-2">
                {isEditing ? (
                  <><Pencil className="w-5 h-5 text-yellow-500" /> Mashg'ulotni tahrirlash</>
                ) : (
                  <><Gamepad2 className="w-5 h-5 text-lime" /> Mashg'ulot qo'shish</>
                )}
              </h5>
              <button
                onClick={() => closeModal('activity')}
                className="p-1 text-text-dim hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Mashg'ulot nomi</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="form-custom"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Kategoriya</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="form-custom">
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">
                  Grafik (ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
                  placeholder="Masalan, Dush va Sesh 16:00-18:00"
                  className="form-custom"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => closeModal('activity')}
                  className="btn-custom flex-1 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
                >
                  Bekor qilish
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-custom flex-1 ${isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'btn-lime'}`}
                >
                  {isEditing ? "O'zgarishlarni saqlash" : "Mashg'ulot qo'shish"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
