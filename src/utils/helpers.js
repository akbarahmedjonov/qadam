export function generateId() {
  return Math.random().toString(36).substring(2, 11)
}

export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export function formatTime(timeStr) {
  const [h, m] = timeStr.split(':')
  return `${h}:${m}`
}

export function getCurrentDay() {
  const days = ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba']
  return days[new Date().getDay()]
}

export function formatFullDate() {
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr']
  const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
  const now = new Date()
  return `${days[now.getDay()]}, ${now.getDate()}-${months[now.getMonth()]} ${now.getFullYear()}`
}

export function formatClockTime() {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  const s = now.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

export function hasCollision(newClass, existingClasses, excludeId = null) {
  const newStart = timeToMinutes(newClass.startTime)
  const newEnd = timeToMinutes(newClass.endTime)

  return existingClasses.some(existing => {
    if (existing.day !== newClass.day) return false
    if (excludeId && existing.id === excludeId) return false
    const exStart = timeToMinutes(existing.startTime)
    const exEnd = timeToMinutes(existing.endTime)
    return (
      (newStart >= exStart && newStart < exEnd) ||
      (newEnd > exStart && newEnd <= exEnd) ||
      (newStart <= exStart && newEnd >= exEnd)
    )
  })
}
