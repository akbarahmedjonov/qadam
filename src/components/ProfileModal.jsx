import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Camera, User, X, Key, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { auth } from '../firebase'

export default function ProfileModal() {
  const { modals, closeModal, userProfile, updateProfile, addToast, resetPassword } = useApp()
  const [name, setName] = useState(userProfile?.name || '')
  const [surname, setSurname] = useState(userProfile?.surname || '')
  const [preview, setPreview] = useState(userProfile?.photo || null)
  const [pwLoading, setPwLoading] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !surname.trim()) {
      addToast('Iltimos, ism va familiyangizni kiriting', 'error')
      return
    }
    updateProfile({
      name: name.trim(),
      surname: surname.trim(),
      photo: preview || userProfile?.photo || null,
    })
    closeModal('profile')
  }

  const handleResetPassword = async () => {
    if (!auth?.currentUser?.email) return
    setPwLoading(true)
    try {
      await resetPassword(auth.currentUser.email)
      addToast('Parolni tiklash havolasi emailingizga yuborildi', 'success')
      closeModal('profile')
    } catch {
      addToast('Xatolik yuz berdi. Qayta urinib ko\'ring', 'error')
    } finally {
      setPwLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {modals.profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="card-custom w-full max-w-md p-0 overflow-hidden"
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h5 className="font-heading font-semibold mb-0 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-cyan" />
                Profil sozlamalari
                {userProfile?.email && (
                  <span className="ml-auto text-xs text-text-dim font-normal">{userProfile.email}</span>
                )}
              </h5>
              <button
                onClick={() => closeModal('profile')}
                className="p-1 text-text-dim hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan">
                    {preview ? (
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-border flex items-center justify-center">
                        <User className="w-8 h-8 text-text-dim" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-cyan text-white flex items-center justify-center border-2 border-card-bg hover:bg-cyan-hover transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block text-text-main">Ism</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="form-custom"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-text-main">Familiya</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    required
                    className="form-custom"
                  />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <motion.button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={pwLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-custom w-full border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {pwLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Key className="w-4 h-4" />
                  )}
                  Parolni o'zgartirish
                </motion.button>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => closeModal('profile')}
                  className="btn-custom flex-1 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
                >
                  Bekor qilish
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-custom btn-cyan flex-1"
                >
                  O'zgarishlarni saqlash
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
