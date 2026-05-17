import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Pencil, Trash2, Trophy, CheckCircle, Star, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function HomeworkPage() {
  const { homework, openModal, toggleHomework, deleteHomework, addToast } = useApp()
  const [gradeNotified, setGradeNotified] = useState(false)

  const pending = homework.filter(h => !h.completed)
  const completed = homework.filter(h => h.completed)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const needsGrade = pending.filter(t =>
    t.type === 'summative' &&
    !t.grade &&
    t.dueDate &&
    new Date(t.dueDate) <= today
  )

  useEffect(() => {
    if (needsGrade.length > 0 && !gradeNotified) {
      setGradeNotified(true)
      addToast(`${needsGrade.length} ta nazorat ishiga baho qo'yilmagan`, 'warning')
    }
  }, [needsGrade.length, gradeNotified, addToast])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h4 className="font-heading font-semibold mb-0">Uy vazifasi va yakuniy baholar</h4>
        <button
          onClick={() => openModal('homework')}
          className="btn-custom btn-magenta flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          Vazifa qo'shish
        </button>
      </div>

      {needsGrade.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-custom p-3 mb-4 border-2 border-yellow-500/50 bg-yellow-500/5"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0">
                {needsGrade.length} ta nazorat ishiga baho qo'yilmagan
              </p>
              <small className="text-text-dim">
                Muddat o'tgan nazorat ishlari uchun baho kiriting
              </small>
            </div>
          </div>
        </motion.div>
      )}

      <h6 className="mb-3 text-cyan font-heading font-semibold">
        Bajarilmagan ({pending.length})
      </h6>

      {pending.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {pending.map((task, i) => {
            const isOverdueSummative = task.type === 'summative' && !task.grade && task.dueDate && new Date(task.dueDate) <= today

            return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`card-custom p-3 ${task.type === 'summative' ? 'border-magenta neon-glow-magenta' : ''} ${isOverdueSummative ? 'border-yellow-500 neon-glow-yellow' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleHomework(task.id)}
                    className="w-4 h-4 accent-cyan rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {task.type === 'summative' ? (
                      <>
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-magenta text-white">
                          <Trophy className="w-3 h-3" />
                          Nazorat ishi
                        </span>
                        {task.grade ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-lime/15 text-lime ml-2">
                            <Star className="w-3 h-3" />
                            {task.grade}/100
                          </span>
                        ) : isOverdueSummative ? (
                          <button
                            onClick={() => openModal('homework', task)}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-500 ml-2 hover:bg-yellow-500/25 transition-colors"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            Baho qo'yish
                          </button>
                        ) : null}
                      </>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-border text-text-dim">
                        Uy vazifasi
                      </span>
                    )}
                  </div>
                  <h6 className="font-semibold mt-2 mb-1">{task.title}</h6>
                  <small className="text-text-dim">
                    {task.subject}
                    {task.dueDate ? ` • Muddat: ${task.dueDate}` : ''}
                  </small>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openModal('homework', task)}
                    className="p-1.5 rounded-lg text-text-dim hover:text-cyan hover:bg-cyan/10 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteHomework(task.id)}
                    className="p-1.5 rounded-lg text-text-dim hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-custom p-6 text-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-lime mx-auto mb-2" />
          <p className="mb-0">Barcha vazifalar bajarildi!</p>
        </motion.div>
      )}

      {completed.length > 0 && (
        <>
          <h6 className="mb-3 text-text-dim font-heading font-semibold">
            Bajarilgan ({completed.length})
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completed.slice(0, 5).map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="card-custom p-3 opacity-75"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => toggleHomework(task.id)}
                      className="w-4 h-4 accent-cyan rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="font-semibold mb-0 line-through">{task.title}</h6>
                    <small className="text-text-dim">{task.subject}</small>
                  </div>
                  <button
                    onClick={() => deleteHomework(task.id)}
                    className="p-1.5 rounded-lg text-text-dim hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
