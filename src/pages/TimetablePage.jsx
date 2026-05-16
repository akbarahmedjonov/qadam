import { motion } from 'framer-motion'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DAY_NAMES, DAY_DISPLAY } from '../utils/constants'
import { formatTime, timeToMinutes, getCurrentDay } from '../utils/helpers'

export default function TimetablePage() {
  const { classes, openModal, deleteClass } = useApp()
  const today = getCurrentDay()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h4 className="font-heading font-semibold mb-0">Haftalik dars jadvali</h4>
        <button
          onClick={() => openModal('class')}
          className="btn-custom btn-cyan flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Dars qo'shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {DAY_NAMES.map((day, idx) => {
          const dayClasses = classes
            .filter(c => c.day === day)
            .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
          const isToday = day === today

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`card-custom p-3 ${isToday ? 'border-2 border-cyan neon-glow-cyan' : ''}`}
            >
              <h6 className={`font-heading font-semibold mb-3 ${isToday ? 'text-cyan' : 'text-text-dim'}`}>
                {DAY_DISPLAY[idx]} {isToday ? '(Bugun)' : ''}
              </h6>
              {dayClasses.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {dayClasses.map(cls => (
                    <div
                      key={cls.id}
                      className="card-custom p-2 flex justify-between items-center"
                    >
                      <div className="min-w-0">
                        <small className="text-text-dim font-mono text-xs">
                          {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                        </small>
                        <div className="font-medium text-sm truncate">{cls.name}</div>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-2">
                        <button
                          onClick={() => openModal('class', cls)}
                          className="p-1.5 rounded-lg text-text-dim hover:text-cyan hover:bg-cyan/10 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteClass(cls.id)}
                          className="p-1.5 rounded-lg text-text-dim hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-dim text-center text-sm py-4 border border-dashed border-border rounded-lg">
                  Darslar yo'q
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
