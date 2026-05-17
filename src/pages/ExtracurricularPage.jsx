import { motion } from 'framer-motion'
import { PlusCircle, Pencil, Trash2, Gamepad2, Clock, Calendar, Trophy, Palette, Users, Heart, Asterisk } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DAY_DISPLAY, DAY_NAMES } from '../utils/constants'

const iconMap = {
  Trophy, Palette, Users, Heart, Asterisk,
}

export default function ExtracurricularPage() {
  const { extracurriculars, openModal, deleteActivity } = useApp()
  const defaultIcon = Asterisk

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h4 className="font-heading font-semibold mb-0">Qo'shimcha mashg'ulotlar</h4>
        <button
          onClick={() => openModal('activity')}
          className="btn-custom btn-lime flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          Mashg'ulot qo'shish
        </button>
      </div>

      {extracurriculars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {extracurriculars.map((act, i) => {
            const Icon = iconMap[act.category === 'sports' ? 'Trophy'
              : act.category === 'arts' ? 'Palette'
              : act.category === 'clubs' ? 'Users'
              : act.category === 'volunteering' ? 'Heart'
              : 'Asterisk'] || defaultIcon

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="card-custom p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <Icon className="w-8 h-8 text-lime" />
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal('activity', act)}
                      className="p-1.5 rounded-lg text-text-dim hover:text-cyan hover:bg-cyan/10 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteActivity(act.id)}
                      className="p-1.5 rounded-lg text-text-dim hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h5 className="font-heading font-semibold mb-1">{act.name}</h5>
                <div className="flex items-center gap-2 flex-wrap">
                  <small className="text-text-dim capitalize">{act.category}</small>
                  {act.day && DAY_NAMES.includes(act.day) && (
                    <small className="inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full bg-lime/10 text-lime">
                      <Calendar className="w-3 h-3" />
                      {DAY_DISPLAY[DAY_NAMES.indexOf(act.day)]}
                    </small>
                  )}
                </div>
                {(act.startTime && act.endTime) ? (
                  <div className="mt-3 pt-3 border-t border-border">
                    <small className="text-text-dim flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.startTime} - {act.endTime}
                    </small>
                  </div>
                ) : act.schedule ? (
                  <div className="mt-3 pt-3 border-t border-border">
                    <small className="text-text-dim flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.schedule}
                    </small>
                  </div>
                ) : null}
              </motion.div>
            )
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-custom p-8 text-center"
        >
          <Gamepad2 className="w-12 h-12 text-lime mx-auto mb-3" />
          <h5 className="font-heading font-semibold">Hali mashg'ulotlar yo'q</h5>
          <p className="text-text-dim">Sport, klublar va qiziqishlaringizni qo'shing!</p>
        </motion.div>
      )}
    </motion.div>
  )
}
