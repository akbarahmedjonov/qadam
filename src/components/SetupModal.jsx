import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Camera, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function SetupModal() {
  const { modals, closeModal, saveProfile, addToast } = useApp()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
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
    saveProfile({ name: name.trim(), surname: surname.trim(), photo: preview })
    closeModal('setup')
  }

  return (
    <AnimatePresence>
      {modals.setup && (
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
            <div className="p-5 border-b border-border">
              <h5 className="font-heading font-semibold mb-0">Xush kelibsiz! Profilingizni sozlaylik</h5>
            </div>
            <form onSubmit={handleSubmit} className="p-5">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan">
                    {preview ? (
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-border flex items-center justify-center">
                        <User className="w-10 h-10 text-text-dim" />
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
                <button type="button" onClick={() => fileRef.current?.click()} className="btn-custom text-xs mt-2 border border-border text-text-dim hover:text-text-main">
                  Rasmni o'zgartirish
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ism"
                  required
                  className="form-custom"
                />
                <input
                  type="text"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                  placeholder="Familiya"
                  required
                  className="form-custom"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-custom btn-cyan w-full mt-4 py-2.5"
              >
                Boshlash
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
