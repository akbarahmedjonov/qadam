import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, updateProfile as firebaseUpdateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { STORAGE_KEYS, MAX_RECENT_SUBJECTS } from '../utils/constants'
import { generateId } from '../utils/helpers'

const AppContext = createContext(null)

function localGet(key) {
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}

function localSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
  const [classes, setClasses] = useState(() => localGet(STORAGE_KEYS.classes) || [])
  const [homework, setHomework] = useState(() => localGet(STORAGE_KEYS.homework) || [])
  const [extracurriculars, setExtracurriculars] = useState(() => localGet(STORAGE_KEYS.extracurriculars) || [])
  const [userProfile, setUserProfile] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [toasts, setToasts] = useState([])
  const [page, setPage] = useState('landing')
  const [recentSubjects, setRecentSubjects] = useState(() => localGet('qadam_recent_subjects') || [])

  const unsubscribers = useRef(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        const cached = localGet(STORAGE_KEYS.userProfile)
        if (cached) {
          cached.email = user.email
          setUserProfile(cached)
        }
        try {
          const profileDoc = await getDoc(doc(db, 'users', user.uid))
          if (profileDoc.exists()) {
            const data = { email: user.email, ...profileDoc.data() }
            setUserProfile(data)
            localSet(STORAGE_KEYS.userProfile, data)
          } else if (user.displayName) {
            const data = { name: user.displayName, surname: '', photo: null, email: user.email }
            setUserProfile(data)
            localSet(STORAGE_KEYS.userProfile, data)
            await setDoc(doc(db, 'users', user.uid), data)
          }
        } catch (err) {
          console.error('Firestore read error [profile]:', err)
          if (user.displayName && !cached) {
            const data = { name: user.displayName, surname: '', photo: null, email: user.email }
            setUserProfile(data)
            localSet(STORAGE_KEYS.userProfile, data)
          }
        }
        setPage('home')
      } else {
        setUserProfile(null)
        setPage('landing')
      }
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (unsubscribers.current) {
      unsubscribers.current.forEach(fn => fn())
      unsubscribers.current = null
    }

    if (!currentUser) {
      setClasses(localGet(STORAGE_KEYS.classes) || [])
      setHomework(localGet(STORAGE_KEYS.homework) || [])
      setExtracurriculars(localGet(STORAGE_KEYS.extracurriculars) || [])
      setDataLoading(false)
      return
    }

    const uid = currentUser.uid
    const loaded = { classes: false, homework: false, extracurriculars: false }
    const syncErrorShown = { current: false }

    const checkLoaded = () => {
      if (loaded.classes && loaded.homework && loaded.extracurriculars) {
        setDataLoading(false)
      }
    }

    const onError = (type) => (err) => {
      console.error(`Firestore sync error [${type}]:`, err)
      if (!syncErrorShown.current) {
        syncErrorShown.current = true
        addToast("Ma'lumotlarni sinxronlash imkonsiz. Firestore sozlamalarini tekshiring.", 'error')
      }
      if (type === 'classes') {
        setClasses(localGet(STORAGE_KEYS.classes) || [])
        loaded.classes = true; checkLoaded()
      } else if (type === 'homework') {
        setHomework(localGet(STORAGE_KEYS.homework) || [])
        loaded.homework = true; checkLoaded()
      } else {
        setExtracurriculars(localGet(STORAGE_KEYS.extracurriculars) || [])
        loaded.extracurriculars = true; checkLoaded()
      }
    }

    const unsubClasses = onSnapshot(
      collection(db, 'users', uid, 'classes'),
      (snapshot) => {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setClasses(data)
        localSet(STORAGE_KEYS.classes, data)
        if (!loaded.classes) { loaded.classes = true; checkLoaded() }
      },
      onError('classes')
    )

    const unsubHomework = onSnapshot(
      collection(db, 'users', uid, 'homework'),
      (snapshot) => {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setHomework(data)
        localSet(STORAGE_KEYS.homework, data)
        if (!loaded.homework) { loaded.homework = true; checkLoaded() }
      },
      onError('homework')
    )

    const unsubExtracurriculars = onSnapshot(
      collection(db, 'users', uid, 'extracurriculars'),
      (snapshot) => {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setExtracurriculars(data)
        localSet(STORAGE_KEYS.extracurriculars, data)
        if (!loaded.extracurriculars) { loaded.extracurriculars = true; checkLoaded() }
      },
      onError('extracurriculars')
    )

    unsubscribers.current = [unsubClasses, unsubHomework, unsubExtracurriculars]

    return () => {
      unsubClasses()
      unsubHomework()
      unsubExtracurriculars()
    }
  }, [currentUser])

  const addRecentSubject = useCallback((subject) => {
    if (!subject) return
    setRecentSubjects(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== subject.toLowerCase())
      const updated = [subject, ...filtered].slice(0, MAX_RECENT_SUBJECTS)
      localSet('qadam_recent_subjects', updated)
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

  const col = useCallback((sub) => {
    if (!currentUser) return null
    return collection(db, 'users', currentUser.uid, sub)
  }, [currentUser])

  const docRef = useCallback((sub, id) => {
    if (!currentUser) return null
    return doc(db, 'users', currentUser.uid, sub, id)
  }, [currentUser])

  const addClass = useCallback(async (classData) => {
    const c = col('classes')
    if (!c) return
    try {
      await addDoc(c, classData)
    } catch (err) {
      console.error('Firestore write error [addClass]:', err)
      addToast("Ma'lumot serverga saqlanmadi. Mahalliy xotirada saqlandi.", 'error')
      const newClass = { ...classData, id: generateId() }
      setClasses(prev => { const u = [...prev, newClass]; localSet(STORAGE_KEYS.classes, u); return u })
    }
    addToast("Dars qo'shildi!", 'success')
  }, [col, addToast])

  const updateClass = useCallback(async (id, classData) => {
    const d = docRef('classes', id)
    if (!d) return
    try {
      await updateDoc(d, classData)
    } catch (err) {
      console.error('Firestore write error [updateClass]:', err)
      addToast("Ma'lumot serverga saqlanmadi. Mahalliy xotirada saqlandi.", 'error')
      setClasses(prev => { const u = prev.map(c => c.id === id ? { ...classData, id } : c); localSet(STORAGE_KEYS.classes, u); return u })
    }
    addToast('Dars yangilandi!', 'success')
  }, [docRef, addToast])

  const deleteClass = useCallback(async (id) => {
    const d = docRef('classes', id)
    if (!d) return
    let deletedData = null
    try {
      const snap = await getDoc(d)
      deletedData = snap.data()
      await deleteDoc(d)
    } catch (err) {
      console.error('Firestore write error [deleteClass]:', err)
      setClasses(prev => { deletedData = prev.find(c => c.id === id); const u = prev.filter(c => c.id !== id); localSet(STORAGE_KEYS.classes, u); return u })
    }
    addToast("Dars o'chirildi", 'info', async () => {
      if (d && deletedData) {
        try {
          await setDoc(d, deletedData)
        } catch (err) {
          console.error('Firestore write error [restoreClass]:', err)
          setClasses(prev => { const u = [...prev, { ...deletedData, id }]; localSet(STORAGE_KEYS.classes, u); return u })
        }
      }
      addToast('Tiklandi!', 'success')
    })
  }, [docRef, addToast])

  const addHomework = useCallback(async (taskData) => {
    const c = col('homework')
    if (!c) return
    try {
      await addDoc(c, { ...taskData, completed: false })
    } catch (err) {
      console.error('Firestore write error [addHomework]:', err)
      addToast("Ma'lumot serverga saqlanmadi. Mahalliy xotirada saqlandi.", 'error')
      const newTask = { ...taskData, id: generateId(), completed: false }
      setHomework(prev => { const u = [...prev, newTask]; localSet(STORAGE_KEYS.homework, u); return u })
    }
    addRecentSubject(taskData.subject)
    addToast('Vazifa qoshildi!', 'success')
  }, [col, addRecentSubject, addToast])

  const updateHomework = useCallback(async (id, taskData) => {
    const d = docRef('homework', id)
    if (!d) return
    try {
      const snap = await getDoc(d)
      const completed = snap.exists() ? snap.data().completed : false
      await updateDoc(d, { ...taskData, completed })
    } catch (err) {
      console.error('Firestore write error [updateHomework]:', err)
      setHomework(prev => {
        const existing = prev.find(h => h.id === id)
        const u = prev.map(h => h.id === id ? { ...taskData, id, completed: existing?.completed || false } : h)
        localSet(STORAGE_KEYS.homework, u)
        return u
      })
    }
    addRecentSubject(taskData.subject)
    addToast('Vazifa yangilandi!', 'success')
  }, [docRef, addRecentSubject, addToast])

  const toggleHomework = useCallback(async (id) => {
    const d = docRef('homework', id)
    let completed = false
    if (!d) return
    try {
      const snap = await getDoc(d)
      completed = !snap.data()?.completed
      await updateDoc(d, { completed })
    } catch (err) {
      console.error('Firestore write error [toggleHomework]:', err)
      setHomework(prev => {
        let toggled = null
        const u = prev.map(h => {
          if (h.id === id) { toggled = { ...h, completed: !h.completed }; return toggled }
          return h
        })
        completed = toggled?.completed || false
        localSet(STORAGE_KEYS.homework, u)
        return u
      })
    }
    if (completed) {
      addToast('Ajoyib! Vazifa bajarildi!', 'success')
    }
  }, [docRef, addToast])

  const deleteHomework = useCallback(async (id) => {
    const d = docRef('homework', id)
    if (!d) return
    let deletedData = null
    try {
      const snap = await getDoc(d)
      deletedData = snap.data()
      await deleteDoc(d)
    } catch (err) {
      console.error('Firestore write error [deleteHomework]:', err)
      setHomework(prev => { deletedData = prev.find(h => h.id === id); const u = prev.filter(h => h.id !== id); localSet(STORAGE_KEYS.homework, u); return u })
    }
    addToast("Vazifa o'chirildi", 'info', async () => {
      if (d && deletedData) {
        try {
          await setDoc(d, deletedData)
        } catch (err) {
          console.error('Firestore write error [restoreHomework]:', err)
          setHomework(prev => { const u = [...prev, { ...deletedData, id }]; localSet(STORAGE_KEYS.homework, u); return u })
        }
      }
      addToast('Tiklandi!', 'success')
    })
  }, [docRef, addToast])

  const addActivity = useCallback(async (activityData) => {
    const c = col('extracurriculars')
    if (!c) return
    try {
      await addDoc(c, activityData)
    } catch (err) {
      console.error('Firestore write error [addActivity]:', err)
      addToast("Ma'lumot serverga saqlanmadi. Mahalliy xotirada saqlandi.", 'error')
      const newAct = { ...activityData, id: generateId() }
      setExtracurriculars(prev => { const u = [...prev, newAct]; localSet(STORAGE_KEYS.extracurriculars, u); return u })
    }
    addToast("Mashg'ulot qo'shildi!", 'success')
  }, [col, addToast])

  const updateActivity = useCallback(async (id, activityData) => {
    const d = docRef('extracurriculars', id)
    if (!d) return
    try {
      await updateDoc(d, activityData)
    } catch (err) {
      console.error('Firestore write error [updateActivity]:', err)
      setExtracurriculars(prev => { const u = prev.map(a => a.id === id ? { ...activityData, id } : a); localSet(STORAGE_KEYS.extracurriculars, u); return u })
    }
    addToast("Mashg'ulot yangilandi!", 'success')
  }, [docRef, addToast])

  const deleteActivity = useCallback(async (id) => {
    const d = docRef('extracurriculars', id)
    if (!d) return
    let deletedData = null
    try {
      const snap = await getDoc(d)
      deletedData = snap.data()
      await deleteDoc(d)
    } catch (err) {
      console.error('Firestore write error [deleteActivity]:', err)
      setExtracurriculars(prev => { deletedData = prev.find(a => a.id === id); const u = prev.filter(a => a.id !== id); localSet(STORAGE_KEYS.extracurriculars, u); return u })
    }
    addToast("Mashg'ulot o'chirildi", 'info', async () => {
      if (d && deletedData) {
        try {
          await setDoc(d, deletedData)
        } catch (err) {
          console.error('Firestore write error [restoreActivity]:', err)
          setExtracurriculars(prev => { const u = [...prev, { ...deletedData, id }]; localSet(STORAGE_KEYS.extracurriculars, u); return u })
        }
      }
      addToast('Tiklandi!', 'success')
    })
  }, [docRef, addToast])

  const signIn = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUp = useCallback(async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      try {
        await firebaseUpdateProfile(cred.user, { displayName })
      } catch (err) {
        console.error('Firebase Auth error [signUp profile]:', err)
      }
    }
  }, [])

  const resetPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email)
  }, [])

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
    addToast("Hisobdan chiqildi", 'info')
  }, [addToast])

  const saveProfile = useCallback(async (profile) => {
    const fullProfile = { ...profile, email: currentUser?.email }
    setUserProfile(fullProfile)
    localSet(STORAGE_KEYS.userProfile, fullProfile)
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), fullProfile)
        await firebaseUpdateProfile(currentUser, {
          displayName: profile.name,
        })
      } catch (err) {
        console.error('Firestore write error [saveProfile]:', err)
      }
    }
    addToast('Profil saqlandi!', 'success')
  }, [addToast, currentUser])

  const updateProfile = useCallback(async (profile) => {
    const fullProfile = { ...profile, email: currentUser?.email }
    setUserProfile(fullProfile)
    localSet(STORAGE_KEYS.userProfile, fullProfile)
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), fullProfile)
        await firebaseUpdateProfile(currentUser, {
          displayName: profile.name,
        })
      } catch (err) {
        console.error('Firestore write error [updateProfile]:', err)
      }
    }
    addToast('Profil yangilandi!', 'success')
  }, [addToast, currentUser])

  return (
    <AppContext.Provider value={{
      classes, homework, extracurriculars, userProfile, theme, page, toasts, modals,
      currentUser, authLoading, dataLoading,
      recentSubjects,
      navigateTo, toggleTheme, addToast, removeToast,
      openModal, closeModal,
      addClass, updateClass, deleteClass,
      addHomework, updateHomework, toggleHomework, deleteHomework,
      addActivity, updateActivity, deleteActivity,
      saveProfile, updateProfile,
      signIn, signUp, resetPassword, signOut,
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
