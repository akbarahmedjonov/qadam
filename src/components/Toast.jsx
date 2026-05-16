import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const iconMap = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
}

const colorMap = {
  error: 'border-l-red-500',
  success: 'border-l-lime',
  info: 'border-l-cyan',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useApp()

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = iconMap[toast.type] || Info

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`card-custom p-3 flex items-center gap-2 border-l-4 ${colorMap[toast.type] || colorMap.info} shadow-lg`}
            >
              <Icon className="w-4 h-4 shrink-0 text-text-main" />
              <span className="text-sm flex-1">{toast.message}</span>
              {toast.undoCallback && (
                <button
                  onClick={() => {
                    toast.undoCallback()
                    removeToast(toast.id)
                  }}
                  className="btn-custom text-xs px-2 py-1 bg-border hover:bg-border/80 transition-colors shrink-0"
                >
                  Bekor qilish
                </button>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                className="p-0.5 text-text-dim hover:text-text-main transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
