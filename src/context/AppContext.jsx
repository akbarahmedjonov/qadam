import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { STORAGE_KEYS, MAX_RECENT_SUBJECTS } from '../utils/constants'
import { generateId } from '../utils/helpers'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [classes, setClasses] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.classes)) || [])
  const [homework, setHomework] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.homework)) || [])
  const [extracurriculars, setExtracurriculars] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.extracurriculars)) || [])
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.userProfile)) || null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [toasts, setToasts] = useState([])
  const [page, setPage] = useState(() => {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.userProfile))
    return profile ? 'home' : 'landing'
  })
  const [recentSubjects, setRecentSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem('qadam_recent_subjects')) || []
  })

  const addRecentSubject = useCallback((subject) => {
    if (!subject) return
    setRecentSubjects(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== subject.toLowerCase())
      const updated = [subject, ...filtered].slice(0, MAX_RECENT_SUBJECTS)
      localStorage.setItem('qadam_recent_subjects', JSON.stringify(updated))
      return updated
    })
  }, [])

  const [modals, setModals] = useState({
    setup: false,
    profile: false,
    class: { open: false, editing: null },
    homework: { open: false, editing: null },
    activity: { open: false, editing: null },
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const save = useCallback((key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [])

  const addToast = useCallback((message, type = 'info', undoCallback = null) => {
    const id = generateId()
    setToasts(prev => [...prev, { id, message, type, undoCallback }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const navigateTo = useCallback((newPage) => {
    setPage(newPage)
  }, [])

  const closeModal = useCallback((modalName) => {
    setModals(prev => ({
      ...prev,
      [modalName]: modalName === 'setup' || modalName === 'profile'
        ? false
        : { open: false, editing: null },
    }))
  }, [])

  const openModal = useCallback((modalName, editing = null) => {
    setModals(prev => ({
      ...prev,
      [modalName]: modalName === 'setup' || modalName === 'profile'
        ? true
        : { open: true, editing },
    }))
  }, [])

  const addClass = useCallback((classData) => {
    const newClass = { ...classData, id: generateId() }
    setClasses(prev => {
      const updated = [...prev, newClass]
      save(STORAGE_KEYS.classes, updated)
      return updated
    })
    addToast("Dars qo'shildi!", 'success')
  }, [save, addToast])

  const updateClass = useCallback((id, classData) => {
    setClasses(prev => {
      const updated = prev.map(c => c.id === id ? { ...classData, id } : c)
      save(STORAGE_KEYS.classes, updated)
      return updated
    })
    addToast('Dars yangilandi!', 'success')
  }, [save, addToast])

  const deleteClass = useCallback((id) => {
    let deletedItem = null
    setClasses(prev => {
      deletedItem = prev.find(c => c.id === id)
      const updated = prev.filter(c => c.id !== id)
      save(STORAGE_KEYS.classes, updated)
      return updated
    })
    addToast("Dars o'chirildi", 'info', () => {
      setClasses(prev => {
        const restored = [...prev, deletedItem]
        save(STORAGE_KEYS.classes, restored)
        return restored
      })
      addToast('Tiklandi!', 'success')
    })
  }, [save, addToast])

  const addHomework = useCallback((taskData) => {
    const newTask = { ...taskData, id: generateId(), completed: false }
    setHomework(prev => {
      const updated = [...prev, newTask]
      save(STORAGE_KEYS.homework, updated)
      return updated
    })
    addRecentSubject(taskData.subject)
    addToast('Vazifa qoshildi!', 'success')
  }, [save, addToast, addRecentSubject])

  const updateHomework = useCallback((id, taskData) => {
    setHomework(prev => {
      const existing = prev.find(h => h.id === id)
      const updated = prev.map(h => h.id === id ? { ...taskData, id, completed: existing?.completed || false } : h)
      save(STORAGE_KEYS.homework, updated)
      return updated
    })
    addRecentSubject(taskData.subject)
    addToast('Vazifa yangilandi!', 'success')
  }, [save, addToast, addRecentSubject])

  const toggleHomework = useCallback((id) => {
    let toggledTask = null
    setHomework(prev => {
      const updated = prev.map(h => {
        if (h.id === id) {
          toggledTask = { ...h, completed: !h.completed }
          return toggledTask
        }
        return h
      })
      save(STORAGE_KEYS.homework, updated)
      return updated
    })
    if (toggledTask?.completed) {
      addToast('Ajoyib! Vazifa bajarildi!', 'success')
    }
  }, [save, addToast])

  const deleteHomework = useCallback((id) => {
    let deletedItem = null
    setHomework(prev => {
      deletedItem = prev.find(h => h.id === id)
      const updated = prev.filter(h => h.id !== id)
      save(STORAGE_KEYS.homework, updated)
      return updated
    })
    addToast("Vazifa o'chirildi", 'info', () => {
      setHomework(prev => {
        const restored = [...prev, deletedItem]
        save(STORAGE_KEYS.homework, restored)
        return restored
      })
      addToast('Tiklandi!', 'success')
    })
  }, [save, addToast])

  const addActivity = useCallback((activityData) => {
    const newAct = { ...activityData, id: generateId() }
    setExtracurriculars(prev => {
      const updated = [...prev, newAct]
      save(STORAGE_KEYS.extracurriculars, updated)
      return updated
    })
    addToast("Mashg'ulot qo'shildi!", 'success')
  }, [save, addToast])

  const updateActivity = useCallback((id, activityData) => {
    setExtracurriculars(prev => {
      const updated = prev.map(a => a.id === id ? { ...activityData, id } : a)
      save(STORAGE_KEYS.extracurriculars, updated)
      return updated
    })
    addToast("Mashg'ulot yangilandi!", 'success')
  }, [save, addToast])

  const deleteActivity = useCallback((id) => {
    let deletedItem = null
    setExtracurriculars(prev => {
      deletedItem = prev.find(a => a.id === id)
      const updated = prev.filter(a => a.id !== id)
      save(STORAGE_KEYS.extracurriculars, updated)
      return updated
    })
    addToast("Mashg'ulot o'chirildi", 'info', () => {
      setExtracurriculars(prev => {
        const restored = [...prev, deletedItem]
        save(STORAGE_KEYS.extracurriculars, restored)
        return restored
      })
      addToast('Tiklandi!', 'success')
    })
  }, [save, addToast])

  const saveProfile = useCallback((profile) => {
    setUserProfile(profile)
    save(STORAGE_KEYS.userProfile, profile)
    addToast('Profil saqlandi!', 'success')
  }, [save, addToast])

  const updateProfile = useCallback((profile) => {
    setUserProfile(profile)
    save(STORAGE_KEYS.userProfile, profile)
    addToast('Profil yangilandi!', 'success')
  }, [save, addToast])

  const isFirstLaunch = !userProfile

  return (
    <AppContext.Provider value={{
      classes, homework, extracurriculars, userProfile, theme, page, toasts, modals,
      recentSubjects, isFirstLaunch,
      navigateTo, toggleTheme, addToast, removeToast,
      openModal, closeModal,
      addClass, updateClass, deleteClass,
      addHomework, updateHomework, toggleHomework, deleteHomework,
      addActivity, updateActivity, deleteActivity,
      saveProfile, updateProfile,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
