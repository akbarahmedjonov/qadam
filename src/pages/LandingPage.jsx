import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Footprints, Calendar, BookOpen, Gamepad2, ArrowRight,
    Sparkles, Moon, Sun, Mail, Lock, User, Loader2,
    BarChart3, Bell, CheckCircle2, TrendingUp, ChevronDown,
    Menu, X, School, GraduationCap, Home, Star, CalendarDays, Book
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const NAV_FEATURES = [
    { icon: Calendar, label: 'Dars jadvali', desc: 'Haftalik darslaringizni vizual boshqaring', color: 'text-cyan' },
    { icon: BookOpen, label: 'Uy vazifalari', desc: 'Topshiriqlar va muddatlarni kuzating', color: 'text-magenta' },
    { icon: Gamepad2, label: "Mashg'ulotlar", desc: "Qo'shimcha faoliyatingizni rejalashtiring", color: 'text-lime' },
    { icon: BarChart3, label: 'Hisobotlar', desc: "O'quv taraqqiyotingizni tahlil qiling", color: 'text-cyan' },
    { icon: Bell, label: 'Eslatmalar', desc: 'Muhim topshiriqlarni unutmang', color: 'text-amber-500' },
]

const STATS = [
    { value: '500+', label: "Faol o'quvchilar", icon: GraduationCap },
    { value: '10+', label: 'Maktablar', icon: School },
    { value: '1000+', label: 'Vazifalar bajarilgan', icon: CheckCircle2 },
]

const AUTH_ERRORS = {
    'auth/user-not-found': 'Foydalanuvchi topilmadi',
    'auth/wrong-password': "Noto'g'ri parol",
    'auth/email-already-in-use': "Bu email allaqachon ro'yxatdan o'tgan",
    'auth/weak-password': 'Parol juda zaif (kamida 6 belgi)',
    'auth/invalid-email': "Noto'g'ri email format",
    'auth/invalid-credential': 'Email yoki parol notogri',
    'auth/too-many-requests': "Juda ko'p urinish. Keyinroq qayta urinib ko'ring",
}

function DashboardMockup() {
    const todayClasses = [
        { name: 'Matematika', time: '08:30 - 09:15', score: 87 },
        { name: 'Fizika', time: '09:25 - 10:10', score: 72 },
        { name: 'Ingliz tili', time: '10:20 - 11:05' },
    ]
    const stats = [
        { icon: CalendarDays, value: '5', label: 'Jami darslar', color: 'text-cyan' },
        { icon: BookOpen, value: '3', label: 'Bajarilmagan vazifalar', color: 'text-magenta' },
        { icon: Gamepad2, value: '2', label: "Mashg'ulotlar", color: 'text-lime' },
    ]

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="rounded-xl border border-border overflow-hidden bg-surface shadow-2xl shadow-black/5">
                <div className="flex h-[440px] md:h-[480px]">
                    {/* Sidebar */}
                    <div className="hidden sm:flex flex-col w-[200px] shrink-0 border-r border-border bg-surface-raised">
                        <div className="pt-3 px-3 mb-3">
                            <div className="flex items-center gap-2 px-2">
                                <Footprints className="w-5 h-5 text-cyan" />
                                <span className="font-heading font-semibold text-sm">Qadam</span>
                            </div>
                        </div>
                        <nav className="flex flex-col px-2 gap-0.5">
                            <div className="relative flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan/10 text-cyan text-xs font-medium">
                                <Home className="w-4 h-4" />
                                <span className="text-xs font-medium">Asosiy</span>
                                <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-cyan" />
                            </div>
                            {[
                                { icon: CalendarDays, label: 'Dars jadvali', active: false },
                                { icon: BookOpen, label: 'Uy vazifasi', active: false },
                                { icon: Gamepad2, label: "Mashg'ulotlar", active: false },
                            ].map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-dim text-xs font-medium">
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </div>
                                )
                            })}
                        </nav>
                        <div className="mt-auto px-3 py-3 space-y-2 border-t border-border">
                            <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border">
                                <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-text-dim shrink-0">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-xs truncate text-text-main">O'quvchi</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 flex flex-col min-w-0 bg-surface">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                            <span className="font-heading font-semibold text-sm">Asosiy</span>
                            <span className="font-mono text-xs text-cyan tracking-wider">14:28:35</span>
                        </div>

                        {/* Page content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Greeting card */}
                            <div className="rounded-xl border border-border bg-card-bg p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center text-text-dim">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-heading font-semibold text-sm">Salom, O'quvchi!</div>
                                        <div className="text-text-dim text-[11px]">Dushanba, 19-May 2026</div>
                                    </div>
                                </div>
                            </div>

                            {/* Today's classes */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-2.5 text-text-main font-heading font-semibold">
                                    <CalendarDays className="w-4 h-4 text-cyan" />
                                    <span className="text-xs font-semibold">Bugungi darslar</span>
                                </div>
                                <div className="space-y-2">
                                    {todayClasses.map((cls, i) => (
                                        <div key={i} className="rounded-xl border border-border bg-card-bg p-3 border-l-4 border-l-cyan">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-[11px] text-text-dim font-mono">{cls.time}</div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-sm font-semibold">{cls.name}</span>
                                                        {cls.score && (
                                                            <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cls.score >= 80 ? 'bg-lime/15 text-lime' :
                                                                cls.score >= 60 ? 'bg-yellow-500/15 text-yellow-500' :
                                                                    'bg-red-500/15 text-red-500'
                                                                }`}>
                                                                <Star className="w-2 h-2" />
                                                                {cls.score}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Book className="w-5 h-5 text-cyan/60" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-2">
                                {stats.map((stat) => {
                                    const Icon = stat.icon
                                    return (
                                        <div key={stat.label} className="rounded-xl border border-border bg-card-bg p-3">
                                            <div className="flex items-center gap-2">
                                                <Icon className={`w-6 h-6 ${stat.color}`} />
                                                <div>
                                                    <div className="font-heading font-bold text-base">{stat.value}</div>
                                                    <div className="text-[10px] text-text-dim">{stat.label}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
    const { theme, toggleTheme, signIn, signUp } = useApp()
    const [authMode, setAuthMode] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [loading, setLoading] = useState(false)
    const [megaMenuOpen, setMegaMenuOpen] = useState(false)
    const [megaMenuIndex, setMegaMenuIndex] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const featuresRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: featuresRef,
        offset: ['start end', 'start center'],
    })
    const dashboardOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
    const dashboardScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

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
            setAuthError(AUTH_ERRORS[err.code] || 'Xatolik yuz berdi')
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
                        <button onClick={() => setAuthMode(null)} className="flex items-center gap-2 cursor-pointer">
                            <Footprints className="w-6 h-6 text-cyan" />
                            <span className="font-heading font-semibold text-lg">Qadam</span>
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-surface-raised border border-border text-text-dim hover:text-text-main transition-colors cursor-pointer"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </motion.button>
                    </div>
                </nav>
                <main className="pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto px-4"
                    >
                        <div className="rounded-xl border border-border bg-card-bg p-6">
                            <h2 className="font-heading text-2xl font-bold text-center mb-6">
                                {authMode === 'signin' ? 'Tizimga kirish' : "Ro'yxatdan o'tish"}
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
                                                className="rounded-xl border border-border bg-surface-raised text-text-main text-sm w-full px-3 py-2.5 pl-10 outline-none transition-colors focus:ring-2 focus:ring-cyan/30 focus:border-cyan"
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
                                            className="rounded-xl border border-border bg-surface-raised text-text-main text-sm w-full px-3 py-2.5 pl-10 outline-none transition-colors focus:ring-2 focus:ring-cyan/30 focus:border-cyan"
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
                                            className="rounded-xl border border-border bg-surface-raised text-text-main text-sm w-full px-3 py-2.5 pl-10 outline-none transition-colors focus:ring-2 focus:ring-cyan/30 focus:border-cyan"
                                        />
                                    </div>
                                </div>
                                {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    className="rounded-xl bg-text-main text-surface font-medium text-sm w-full py-2.5 flex items-center justify-center gap-2 disabled:opacity-60 transition-all hover:opacity-90 cursor-pointer"
                                >
                                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {authMode === 'signin' ? 'Kirish' : "Ro'yxatdan o'tish"}
                                </motion.button>
                            </form>
                            <div className="mt-4 text-center text-sm text-text-dim">
                                {authMode === 'signin' ? (
                                    <>Hisobingiz yo'qmi?{' '}
                                        <button onClick={() => switchMode('signup')} className="text-cyan hover:underline cursor-pointer">Ro'yxatdan o'tish</button>
                                    </>
                                ) : (
                                    <>Allaqachon hisobingiz bormi?{' '}
                                        <button onClick={() => switchMode('signin')} className="text-cyan hover:underline cursor-pointer">Tizimga kirish</button>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 text-center">
                                <button onClick={() => setAuthMode(null)} className="text-text-dim hover:text-text-main text-sm transition-colors cursor-pointer">
                                    &larr; Orqaga
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
            <div className="hidden lg:block fixed left-1/2 -translate-x-[580px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/20 to-transparent pointer-events-none z-50" />
            <div className="hidden lg:block fixed left-1/2 translate-x-[580px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/20 to-transparent pointer-events-none z-50" />

            <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-lg border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Footprints className="w-6 h-6 text-cyan" />
                        <span className="font-heading font-semibold text-lg">Qadam</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-text-dim hover:text-text-main text-sm font-medium transition-colors">Imkoniyatlar</a>
                        <div
                            className="relative"
                            onMouseEnter={() => { setMegaMenuOpen(true); setMegaMenuIndex(0) }}
                            onMouseLeave={() => setMegaMenuOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-text-dim hover:text-text-main text-sm font-medium transition-colors cursor-pointer">
                                Xususiyatlar
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            <AnimatePresence>
                                {megaMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full mt-2 -left-4 w-[340px] rounded-xl border border-border bg-surface-raised shadow-xl p-3"
                                    >
                                        <AnimatePresence mode="popLayout">
                                            <motion.div
                                                key={megaMenuIndex}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 12 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {(() => {
                                                    const item = NAV_FEATURES[megaMenuIndex]
                                                    const Icon = item.icon
                                                    return (
                                                        <div className="p-3">
                                                            <div className={`inline-flex p-2.5 rounded-xl ${item.color} bg-surface border border-border mb-3`}>
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <div className="text-sm font-semibold text-text-main mb-0.5">{item.label}</div>
                                                            <div className="text-xs text-text-dim">{item.desc}</div>
                                                        </div>
                                                    )
                                                })()}
                                            </motion.div>
                                        </AnimatePresence>
                                        <div className="border-t border-border mt-2 pt-2 grid grid-cols-3 gap-1">
                                            {NAV_FEATURES.map((item, i) => (
                                                <button
                                                    key={item.label}
                                                    onMouseEnter={() => setMegaMenuIndex(i)}
                                                    className={`text-center p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${megaMenuIndex === i ? 'bg-surface text-text-main' : 'text-text-dim hover:text-text-main'
                                                        }`}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <button onClick={() => switchMode('signin')} className="text-text-dim hover:text-text-main text-sm font-medium transition-colors cursor-pointer">Kirish</button>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-surface-raised border border-border text-text-dim hover:text-text-main transition-colors cursor-pointer"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => switchMode('signup')}
                            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl border-2 border-text-main text-text-main hover:bg-text-main hover:text-surface transition-all duration-200 cursor-pointer"
                        >
                            Bepul boshlash
                        </motion.button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text-dim hover:text-text-main cursor-pointer"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-14 left-0 right-0 z-30 bg-surface border-b border-border p-4 md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-text-dim hover:text-text-main text-sm font-medium">Imkoniyatlar</a>
                            <button onClick={() => { setMobileMenuOpen(false); switchMode('signin') }} className="text-text-dim hover:text-text-main text-sm font-medium text-left cursor-pointer">Kirish</button>
                            <button onClick={() => { setMobileMenuOpen(false); switchMode('signup') }} className="w-full rounded-xl bg-text-main text-surface py-2.5 text-sm font-medium cursor-pointer">Bepul boshlash</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="pt-32 pb-16 md:pb-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 text-cyan text-xs font-medium mb-6 border border-cyan/20">
                            <Sparkles className="w-3.5 h-3.5" />
                            O'quvchilar uchun rejalashtiruvchi
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight"
                    >
                        Eng muhimi
                        <br />
                        <span className="bg-gradient-to-r from-cyan to-blue-500 bg-clip-text text-transparent">Birinchi Qadam</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-text-dim text-base md:text-lg max-w-xl mx-auto mb-8"
                    >
                        Hech qachon darsni, vazifani yoki
                        muddatni o'tkazib yubormang – barchasini bir joyda kuzating.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => switchMode('signup')}
                            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-xl bg-text-main text-surface hover:opacity-90 transition-all cursor-pointer"
                        >
                            Bepul boshlash
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                        <button onClick={() => switchMode('signin')} className="text-sm text-text-dim hover:text-text-main transition-colors cursor-pointer sm:ml-6">
                            Hisobingiz bormi? Kirish
                        </button>
                    </motion.div>
                </div>
            </section>

            <motion.div
                style={{ opacity: dashboardOpacity, scale: dashboardScale }}
                className="max-w-6xl mx-auto px-4 pb-24 md:pb-32"
            >
                <DashboardMockup />
            </motion.div>

            <section ref={featuresRef} id="features" className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-medium text-text-dim uppercase tracking-widest">Imkoniyatlar</span>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2">
                            Talabangizga mos keladigan hamma narsa
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="md:row-span-2 md:col-span-1 rounded-xl border border-border bg-card-bg p-6 flex flex-col group hover:border-cyan/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2.5 rounded-xl bg-cyan/10 text-cyan">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium text-cyan uppercase tracking-wider">Rejalashtirish</span>
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">Dars jadvali</h3>
                            <p className="text-text-dim text-sm leading-relaxed mb-4">Hech qachon darsni o'tkazib yubormang.</p>
                            <div className="mt-auto rounded-xl bg-cyan/5 border border-cyan/10 p-4 space-y-2">
                                {['Matematika', 'Fizika', 'Ingliz tili', 'Tarix'].map(s => (
                                    <div key={s} className="flex items-center gap-2 text-xs text-text-dim">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan/60" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:col-span-1 rounded-xl border border-border bg-card-bg p-6 group hover:border-magenta/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2.5 rounded-xl bg-magenta/10 text-magenta">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium text-magenta uppercase tracking-wider">Vazifalar</span>
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">Uy vazifalari</h3>
                            <p className="text-text-dim text-sm leading-relaxed">Topshiriqlar ustidan nazoratni saqlang. Barcha muddatlarni bir joyda ko'ring.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="md:col-span-1 rounded-xl border border-border bg-card-bg p-6 group hover:border-lime/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2.5 rounded-xl bg-lime/10 text-lime">
                                    <Gamepad2 className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium text-lime uppercase tracking-wider">Faoliyat</span>
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">Mashg'ulotlar</h3>
                            <p className="text-text-dim text-sm leading-relaxed">Barcha faoliyatingizni bir joyda jamlang.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="md:col-span-2 rounded-xl border border-border bg-card-bg p-6 group hover:border-cyan/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2.5 rounded-xl bg-cyan/10 text-cyan">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium text-cyan uppercase tracking-wider">Tahlil</span>
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">Hisobotlar</h3>
                            <p className="text-text-dim text-sm leading-relaxed">Natijalaringizni bir qarashda ko'ring. Haftalik taraqqiyotingizni kuzating.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="md:col-span-3 rounded-xl border border-border bg-card-bg p-6 group hover:border-amber-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium text-amber-500 uppercase tracking-wider">Xabarlar</span>
                            </div>
                            <h3 className="font-heading text-lg font-semibold mb-2">Eslatmalar</h3>
                            <p className="text-text-dim text-sm leading-relaxed">Muhim muddatlarni unutmang.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="border-t border-border py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {STATS.map((stat, i) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="group relative rounded-xl border border-border bg-card-bg text-center overflow-hidden"
                                >
                                    <div className="px-6 py-6 pb-8">
                                        <Icon className="w-5 h-5 text-text-dim mx-auto mb-3 group-hover:text-cyan transition-colors" />
                                        <div className="font-heading text-3xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm text-text-dim">{stat.label}</div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        <button
                                            onClick={() => switchMode('signup')}
                                            className="w-full py-2.5 text-sm font-medium bg-text-main text-surface rounded-b-xl cursor-pointer"
                                        >
                                            Bepul boshlash &rarr;
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
                            Tayyormisiz?
                        </h2>
                        <p className="text-text-dim text-base md:text-lg mb-8 max-w-lg mx-auto">
                            Bugunoq boshlang va maktab hayotingizni tartibga soling.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => switchMode('signup')}
                            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-xl bg-text-main text-surface hover:opacity-90 transition-all cursor-pointer"
                        >
                            Bepul boshlash
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <footer className="border-t border-border py-8">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-text-dim">
                        <Footprints className="w-4 h-4" />
                        <span className="text-sm">Qadam</span>
                    </div>
                    <p className="text-text-dim text-sm">
                        &copy; {new Date().getFullYear()} Akbar Ahmedjonov Tomonidan
                    </p>
                </div>
            </footer>
        </div>
    )
}
