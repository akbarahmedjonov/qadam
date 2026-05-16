import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

function FoxIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 3v9c0 6-4 8-6 8-2.5 0-4.5-2-6-8V3" />
      <path d="M15 3c0 4 2 6 2 8-2 0-2-2-2-8" />
      <path d="M9 3c0 4-2 6-2 8 2 0 2-2 2-8" />
      <path d="M12 21c3.5 0 6-2 6-6V7" />
    </svg>
  )
}

export default function FoxMascot() {
  const { addToast } = useApp()

  return (
    <motion.button
      onClick={() => addToast('Vah, menga qaradingiz!', 'info')}
      className="fixed bottom-6 right-6 z-40 cursor-pointer text-fox-light dark:text-fox-dark"
      whileHover={{ scale: 1.15, rotate: -5 }}
      whileTap={{ scale: 1.3, rotate: 10 }}
      animate={{
        y: [0, -12, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <FoxIcon className="w-12 h-12" />
    </motion.button>
  )
}
