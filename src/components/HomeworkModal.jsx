import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Pencil, X, FileText, Trophy } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function HomeworkModal() {
  const { modals, closeModal, addHomework, updateHomework, homework, recentSubjects } = useApp()

  const editing = modals.homework.editing
  const isEditing = !!editing

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [type, setType] = useState('homework')

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || '')
      setSubject(editing.subject || '')
      setDueDate(editing.dueDate || '')
      setType(editing.type || 'homework')
    } else {
      setTitle('')
      setSubject('')
      setDueDate('')
      setType('homework')
    }
  }, [editing, modals.homework.open])

  const handleSubmit = (e) => {
    e.preventDefault()
    const taskData = { title: title.trim(), subject, dueDate, type }

    if (isEditing) {
      updateHomework(editing.id, taskData)
    } else {
      addHomework(taskData)
    }
    closeModal('homework')
  }

  return (
    <AnimatePresence>
      {modals.homework.open && (
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
                  <><Pencil className="w-5 h-5 text-yellow-500" /> Vazifani tahrirlash</>
                ) : (
                  <><BookOpen className="w-5 h-5 text-magenta" /> Vazifa qo'shish</>
                )}
              </h5>
              <button
                onClick={() => closeModal('homework')}
                className="p-1 text-text-dim hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Vazifa sarlavhasi</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="form-custom"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Fan</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Fan nomini kiriting"
                  list="subjectSuggestions"
                  className="form-custom"
                />
                <datalist id="subjectSuggestions">
                  {recentSubjects.map((s, i) => (
                    <option key={i} value={s} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Muddati</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="form-custom" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-text-main">Vazifa turi</label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      type === 'homework' ? 'border-cyan bg-cyan/5' : 'border-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="homework"
                      checked={type === 'homework'}
                      onChange={e => setType(e.target.value)}
                      className="sr-only"
                    />
                    <FileText className="w-6 h-6 text-cyan" />
                    <span className="text-xs font-medium">Uy vazifasi</span>
                  </label>
                  <label
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      type === 'summative' ? 'border-magenta bg-magenta/5' : 'border-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="summative"
                      checked={type === 'summative'}
                      onChange={e => setType(e.target.value)}
                      className="sr-only"
                    />
                    <Trophy className="w-6 h-6 text-magenta" />
                    <span className="text-xs font-medium">Nazorat ishi</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => closeModal('homework')}
                  className="btn-custom flex-1 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
                >
                  Bekor qilish
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn-custom flex-1 ${isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'btn-magenta'}`}
                >
                  {isEditing ? "O'zgarishlarni saqlash" : 'Vazifa qo\'shish'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
