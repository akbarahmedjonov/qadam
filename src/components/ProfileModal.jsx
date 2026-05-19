import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Camera, User, X, Key, Loader2 } from 'lucide-react'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { useApp } from '../context/AppContext'
import { auth } from '../firebase'

export default function ProfileModal() {
  const { modals, closeModal, userProfile, updateProfile, addToast } = useApp()
  const [name, setName] = useState(userProfile?.name || '')
  const [surname, setSurname] = useState(userProfile?.surname || '')
  const [preview, setPreview] = useState(userProfile?.photo || null)
  const [pwLoading, setPwLoading] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
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

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!auth?.currentUser?.email) return
    if (newPassword !== confirmPassword) {
      addToast('Yangi parollar mos kelmadi', 'error')
      return
    }
    if (newPassword.length < 6) {
      addToast('Yangi parol kamida 6 belgidan iborat bo\'lishi kerak', 'error')
      return
    }
    setPwLoading(true)
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPassword)
      addToast('Parol muvaffaqiyatli o\'zgartirildi', 'success')
      setShowPasswordForm(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        addToast('Eski parol noto\'g\'ri', 'error')
      } else {
        addToast('Xatolik yuz berdi. Qayta urinib ko\'ring', 'error')
      }
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
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-12 sm:p-4 bg-black/60 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="card-custom w-full max-w-md p-0 my-auto"
          >
            <div className="p-4 sm:p-5 border-b border-border flex items-center gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <UserCircle className="w-5 h-5 text-cyan shrink-0" />
                <h5 className="font-heading font-semibold mb-0 truncate">Profil sozlamalari</h5>
                {userProfile?.email && (
                  <span className="hidden sm:inline text-xs text-text-dim font-normal truncate ml-auto">{userProfile.email}</span>
                )}
              </div>
              <button
                onClick={() => closeModal('profile')}
                className="p-1 text-text-dim hover:text-text-main transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-5">
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
                {!showPasswordForm ? (
                  <motion.button
                    type="button"
                    onClick={() => setShowPasswordForm(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-custom w-full border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Parolni o'zgartirish
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block text-text-main">Eski parol</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                        className="form-custom"
                        placeholder="Eski parolingizni kiriting"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block text-text-main">Yangi parol</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="form-custom"
                        placeholder="Yangi parolingizni kiriting"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block text-text-main">Yangi parolni takrorlang</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="form-custom"
                        placeholder="Yangi parolingizni qayta kiriting"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false)
                          setOldPassword('')
                          setNewPassword('')
                          setConfirmPassword('')
                        }}
                        className="btn-custom flex-1 border border-border text-text-dim hover:text-text-main hover:bg-border transition-colors"
                      >
                        Bekor qilish
                      </button>
                      <motion.button
                        type="button"
                        disabled={pwLoading}
                        onClick={handleChangePassword}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-custom btn-cyan flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {pwLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Key className="w-4 h-4" />
                        )}
                        O'zgartirish
                      </motion.button>
                    </div>
                  </div>
                )}
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
