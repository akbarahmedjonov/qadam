import { useState } from 'react'
import { motion } from 'framer-motion'
import { Footprints, Calendar, BookOpen, Gamepad2, ArrowRight, Sparkles, Moon, Sun, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

const features = [
    { icon: Calendar, label: 'Dars jadvali', desc: 'Haftalik darslaringizni tartibga soling', color: 'text-cyan' },
    { icon: BookOpen, label: 'Uy vazifasi', desc: 'Vazifalaringizni kuzatib boring', color: 'text-magenta' },
    { icon: Gamepad2, label: "Mashg'ulotlar", desc: "Qo'shimcha faoliyatingizni boshqaring", color: 'text-lime' },
]

const authErrors = {
  'auth/user-not-found': 'Foydalanuvchi topilmadi',
  'auth/wrong-password': 'Noto\'g\'ri parol',
  'auth/email-already-in-use': 'Bu email allaqachon ro\'yxatdan o\'tgan',
  'auth/weak-password': 'Parol juda zaif (kamida 6 belgi)',
  'auth/invalid-email': 'Noto\'g\'ri email format',
  'auth/invalid-credential': 'Email yoki parol noto\'g\'ri',
  'auth/too-many-requests': 'Juda ko\'p urinish. Keyinroq qayta urinib ko\'ring',
}

export default function LandingPage() {
  const { theme, toggleTheme, signIn, signUp } = useApp()
  const [authMode, setAuthMode] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setAuthError('')
    setLoading(true)
    try {
      if (authMode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(email, password, name.trim())
      }
    } catch (err) {
      setAuthError(authErrors[err.code] || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (mode) => {
    setAuthMode(mode)
    setAuthError('')
    setName('')
    setEmail('')
    setPassword('')
  }

  if (authMode) {
    return (
      <div className="min-h-screen bg-surface overflow-y-auto">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Footprints className="w-6 h-6 text-cyan" />
              <span className="font-heading font-semibold text-lg">Qadam</span>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-surface-raised border border-border text-text-dim hover:text-text-main transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </nav>

        <main className="pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto px-4"
          >
            <div className="card-custom p-6">
              <h2 className="font-heading text-2xl font-bold text-center mb-6">
                {authMode === 'signin' ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'}
              </h2>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="text-sm font-medium mb-1 block text-text-dim">Ism</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ismingiz"
                        required
                        className="form-custom pl-10"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-1 block text-text-dim">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                      className="form-custom pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block text-text-dim">Parol</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Parol"
                      required
                      minLength={6}
                      className="form-custom pl-10"
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-red-500 text-sm text-center">{authError}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="btn-custom btn-cyan w-full py-2.5 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {authMode === 'signin' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
                </motion.button>
              </form>

              <div className="mt-4 text-center text-sm text-text-dim">
                {authMode === 'signin' ? (
                  <>Hisobingiz yo'qmi?{' '}
                    <button onClick={() => switchMode('signup')} className="text-cyan hover:underline">
                      Ro'yxatdan o'tish
                    </button>
                  </>
                ) : (
                  <>Allaqachon hisobingiz bormi?{' '}
                    <button onClick={() => switchMode('signin')} className="text-cyan hover:underline">
                      Tizimga kirish
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setAuthMode(null)}
                  className="text-text-dim hover:text-text-main text-sm transition-colors"
                >
                  ← Orqaga
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface overflow-y-auto">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Footprints className="w-6 h-6 text-cyan" />
            <span className="font-heading font-semibold text-lg">Qadam</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-surface-raised border border-border text-text-dim hover:text-text-main transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchMode('signin')}
              className="btn-custom btn-cyan flex items-center gap-2"
            >
              Kirish
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              O'quvchilar uchun rejalashtiruvchi
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Maktab hayotingizni
            <br />
            <span className="text-cyan">tartibga soling</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-dim text-lg max-w-2xl mx-auto mb-10"
          >
            Qadam - bu o'quvchilar uchun zamonaviy rejalashtiruvchi. Dars jadvalidan tortib,
            uy vazifalari va qo'shimcha mashg'ulotlargacha - barchasini bir joyda boshqaring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchMode('signup')}
              className="btn-custom btn-cyan px-8 py-3 text-base flex items-center gap-2"
            >
              Bepul boshlash
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 pb-24"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
            Barcha imkoniyatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-custom p-6 text-center"
              >
                <div className={`inline-flex p-3 rounded-xl bg-surface-raised border border-border mb-4 ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.label}</h3>
                <p className="text-text-dim text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-border py-6 text-center text-text-dim text-sm">
        <p>&copy; {new Date().getFullYear()} Qadam | Akbar Ahmedjonov Tomonidan</p>
      </footer>
    </div>
  )
}
