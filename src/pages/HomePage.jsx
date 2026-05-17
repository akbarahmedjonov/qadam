import { motion } from 'framer-motion'
import { CalendarCheck, BookOpen, Gamepad2, User, Book, CalendarDays, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getCurrentDay, formatTime, timeToMinutes, formatFullDate } from '../utils/helpers'

export default function HomePage() {
  const { classes, homework, extracurriculars, userProfile } = useApp()

  const today = getCurrentDay()
  const todayClasses = classes
    .filter(c => c.day === today)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
  const pending = homework.filter(h => !h.completed).length

  const subjectAverages = homework
    .filter(h => h.type === 'summative' && h.grade)
    .reduce((acc, h) => {
      if (!acc[h.subject]) acc[h.subject] = { sum: 0, count: 0 }
      acc[h.subject].sum += Number(h.grade)
      acc[h.subject].count += 1
      return acc
    }, {})

  const userName = userProfile?.name || "O'quvchi"
  const hasPhoto = userProfile?.photo

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="card-custom p-4 md:p-6"
      >
        <div className="flex items-center gap-4">
          {hasPhoto ? (
            <img
              src={userProfile.photo}
              alt="Profil"
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center text-text-dim">
              <User className="w-7 h-7" />
            </div>
          )}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-0">
              Salom, {userName}!
            </h3>
            <p className="text-text-dim text-sm mb-0">{formatFullDate()}</p>
          </div>
        </div>
      </motion.div>

      <div>
        <h5 className="flex items-center gap-2 mb-3 text-text-main font-heading font-semibold">
          <CalendarCheck className="w-5 h-5 text-cyan" />
          Bugungi darslar
        </h5>

        {todayClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todayClasses.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                className="card-custom p-3 border-l-4 border-l-cyan"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <small className="text-text-dim font-mono text-xs">
                      {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                    </small>
                    <div className="flex items-center gap-2 mt-1">
                      <h6 className="font-semibold mb-0">{cls.name}</h6>
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
                  <Book className="w-6 h-6 text-cyan" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-custom p-6 text-center"
          >
            <CalendarCheck className="w-12 h-12 text-text-dim mx-auto mb-2" />
            <p className="text-text-dim mb-0">Bugun darslar yo'q</p>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card-custom p-4"
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-cyan" />
            <div>
              <h4 className="font-heading font-bold text-xl mb-0">{classes.length}</h4>
              <small className="text-text-dim">Jami darslar</small>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="card-custom p-4"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-magenta" />
            <div>
              <h4 className="font-heading font-bold text-xl mb-0">{pending}</h4>
              <small className="text-text-dim">Bajarilmagan vazifalar</small>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card-custom p-4"
        >
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-lime" />
            <div>
              <h4 className="font-heading font-bold text-xl mb-0">{extracurriculars.length}</h4>
              <small className="text-text-dim">Mashg'ulotlar</small>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
