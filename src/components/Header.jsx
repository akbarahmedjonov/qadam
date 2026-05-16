import { useState, useEffect } from 'react'
import { formatClockTime } from '../utils/helpers'
import { PAGE_TITLES } from '../utils/constants'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { page } = useApp()
  const [time, setTime] = useState(formatClockTime())

  useEffect(() => {
    const interval = setInterval(() => setTime(formatClockTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="hidden md:flex justify-between items-center px-6 py-4 shrink-0">
      <h2 className="font-heading font-semibold text-xl mb-0">
        {PAGE_TITLES[page] || 'Asosiy'}
      </h2>
      <div className="font-mono text-sm text-cyan tracking-wider">
        {time}
      </div>
    </header>
  )
}
