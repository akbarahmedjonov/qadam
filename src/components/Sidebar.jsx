import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Footprints, X, Home, Calendar, BookOpen, Gamepad2, Moon, Sun, Settings, User, Menu, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PAGES } from '../utils/constants'

export default function Sidebar({ onNavigate }) {
  const { theme, toggleTheme, page, userProfile, openModal, signOut } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (key) => {
    onNavigate(key)
    setMobileOpen(false)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="pt-3 md:pt-4">
        <div className="mb-3 md:mb-4 px-3 flex items-center justify-between">
          <h4 className="flex items-center gap-2 mb-0 font-heading font-semibold">
            <Footprints className="w-6 h-6 text-cyan" />
            <span className="hidden sm:inline">Qadam</span>
          </h4>
          <button
            className="md:hidden p-1 text-text-dim hover:text-text-main"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <ul className="flex flex-col px-2 gap-0.5">
          {PAGES.map(p => {
            const icons = { Home, Calendar, BookOpen, Gamepad2 }
            const Icon = icons[p.icon]
            const isActive = page === p.key
            return (
              <li key={p.key} className="relative">
                <motion.button
                  initial={false}
                  animate={{ backgroundColor: isActive ? 'var(--color-border)' : 'transparent' }}
                  onClick={() => handleNav(p.key)}
                  className="nav-link-custom w-full flex items-center gap-3 text-left"
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{p.label}</span>
                </motion.button>
                {isActive && (
                  <motion.div
                    layoutId="page-indicator"
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-cyan"
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-auto p-3 space-y-2">
        <button
          onClick={toggleTheme}
          className="btn-custom w-full flex items-center justify-center gap-2 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
        >
          {theme === 'dark' ? (
            <><Sun className="w-4 h-4" /><span>Yorug' rejim</span></>
          ) : (
            <><Moon className="w-4 h-4" /><span>Qorong'i rejim</span></>
          )}
        </button>

        <button
          onClick={() => openModal('profile')}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-raised border border-border hover:bg-border transition-colors text-left"
        >
          {userProfile?.photo ? (
            <img
              src={userProfile.photo}
              alt=""
              className="w-10 h-10 rounded-full object-cover border-2 border-cyan shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-text-dim shrink-0">
              <User className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate text-text-main">
              {userProfile?.name || 'Foydalanuvchi'}
            </div>
          </div>
          <Settings className="w-4 h-4 text-text-dim shrink-0" />
        </button>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-text-dim hover:text-red-500 hover:bg-red-500/10 border border-border transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Chiqish</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        className="md:hidden fixed top-3 left-3 z-[1001] p-2 rounded-lg bg-card-bg border border-border text-text-dim"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[999] md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col w-[250px] shrink-0 h-screen bg-surface-raised border-r border-border sticky top-0">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 w-[280px] max-w-[85vw] h-screen z-[1000] bg-surface-raised border-r border-border md:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
