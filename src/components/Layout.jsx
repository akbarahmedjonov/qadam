import Sidebar from './Sidebar'
import Header from './Header'
import { useApp } from '../context/AppContext'

export default function Layout({ children }) {
  const { navigateTo } = useApp()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onNavigate={navigateTo} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
