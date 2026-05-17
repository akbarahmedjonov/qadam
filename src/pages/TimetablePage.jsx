import { motion } from 'framer-motion'
import { PlusCircle, Pencil, Trash2, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DAY_NAMES, DAY_DISPLAY } from '../utils/constants'
import { formatTime, timeToMinutes, getCurrentDay } from '../utils/helpers'

export default function TimetablePage() {
  const { classes, homework, openModal, deleteClass } = useApp()
  const today = getCurrentDay()

  const subjectAverages = homework
    .filter(h => h.type === 'summative' && h.grade)
    .reduce((acc, h) => {
      if (!acc[h.subject]) acc[h.subject] = { sum: 0, count: 0 }
      acc[h.subject].sum += Number(h.grade)
      acc[h.subject].count += 1
      return acc
    }, {})

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
                        <div className="font-medium text-sm truncate flex items-center gap-2">
                          {cls.name}
                          {(() => {
                            const avg = subjectAverages[cls.name]
                            if (!avg) return null
                            const score = Math.round(avg.sum / avg.count)
                            return (
                              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                                score >= 80 ? 'bg-lime/15 text-lime' :
                                score >= 60 ? 'bg-yellow-500/15 text-yellow-500' :
                                'bg-red-500/15 text-red-500'
                              }`}>
                                <Star className="w-2.5 h-2.5" />
                                {score}
                              </span>
                            )
                          })()}
                        </div>
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
