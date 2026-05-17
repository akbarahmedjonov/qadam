import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, Pencil, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DAY_NAMES } from '../utils/constants'
import { hasCollision } from '../utils/helpers'

export default function ClassModal() {
  const { modals, closeModal, addClass, updateClass, classes, addToast } = useApp()

  const editing = modals.class.editing
  const isEditing = !!editing

  const [name, setName] = useState(editing?.name || '')
  const [day, setDay] = useState(editing?.day || 'dushanba')
  const [startTime, setStartTime] = useState(editing?.startTime || '08:30')
  const [endTime, setEndTime] = useState(editing?.endTime || '09:15')

  const handleSubmit = (e) => {
    e.preventDefault()
    const classData = { name: name.trim(), day, startTime, endTime }

    if (hasCollision(classData, classes, editing?.id)) {
      addToast("Vaqt to'qnashuvi! Bu dars boshqa dars bilan bir vaqtga to'g'ri keladi.", 'error')
      return
    }

    if (isEditing) {
      updateClass(editing.id, classData)
    } else {
      addClass(classData)
    }
    closeModal('class')
  }

  return (
    <AnimatePresence>
      {modals.class.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <motion.div
            key={editing?.id || 'new'}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="card-custom w-full max-w-md p-0 overflow-hidden"
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h5 className="font-heading font-semibold mb-0 flex items-center gap-2">
                {isEditing ? (
                  <><Pencil className="w-5 h-5 text-yellow-500" /> Darsni tahrirlash</>
                ) : (
                  <><PlusCircle className="w-5 h-5 text-cyan" /> Dars qo'shish</>
                )}
              </h5>
              <button
                onClick={() => closeModal('class')}
                className="p-1 text-text-dim hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Dars nomi</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Masalan, Matematika"
                  className="form-custom"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Kun</label>
                <select value={day} onChange={e => setDay(e.target.value)} className="form-custom">
                  {DAY_NAMES.map(d => (
                    <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block text-text-main">Boshlanish vaqti</label>
                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required step="60" className="form-custom" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-text-main">Tugash vaqti</label>
                  <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required step="60" className="form-custom" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => closeModal('class')}
                  className="btn-custom flex-1 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
                >
                  Bekor qilish
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-custom flex-1 ${isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'btn-cyan'}`}
                >
                  {isEditing ? "O'zgarishlarni saqlash" : "Dars qo'shish"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
