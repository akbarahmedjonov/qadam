import { motion } from 'framer-motion'
import { Footprints, Calendar, BookOpen, Gamepad2, ArrowRight, Sparkles, Moon, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext'

const features = [
    { icon: Calendar, label: 'Dars jadvali', desc: 'Haftalik darslaringizni tartibga soling', color: 'text-cyan' },
    { icon: BookOpen, label: 'Uy vazifasi', desc: 'Vazifalaringizni kuzatib boring', color: 'text-magenta' },
    { icon: Gamepad2, label: "Mashg'ulotlar", desc: "Qo'shimcha faoliyatingizni boshqaring", color: 'text-lime' },
]

export default function LandingPage() {
    const { navigateTo, theme, toggleTheme } = useApp()

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
                            onClick={() => navigateTo('home')}
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
                            onClick={() => navigateTo('home')}
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
