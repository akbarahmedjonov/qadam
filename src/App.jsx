import { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import TimetablePage from './pages/TimetablePage'
import HomeworkPage from './pages/HomeworkPage'
import ExtracurricularPage from './pages/ExtracurricularPage'
import SetupModal from './components/SetupModal'
import ProfileModal from './components/ProfileModal'
import ClassModal from './components/ClassModal'
import HomeworkModal from './components/HomeworkModal'
import ActivityModal from './components/ActivityModal'
import ToastContainer from './components/Toast'

function AppContent() {
  const { page, isFirstLaunch, openModal } = useApp()

  useEffect(() => {
    if (isFirstLaunch && page === 'home') {
      openModal('setup')
    }
  }, [isFirstLaunch, page, openModal])

  if (page === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    )
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />
      case 'timetable': return <TimetablePage />
      case 'homework': return <HomeworkPage />
      case 'extracurricular': return <ExtracurricularPage />
      default: return <HomePage />
    }
  }

  return (
    <>
      <Layout>
        {renderPage()}
      </Layout>
      <ToastContainer />
      <SetupModal />
      <ProfileModal />
      <ClassModal />
      <HomeworkModal />
      <ActivityModal />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
