import { Aside, MobileHeader } from '@/components'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header mobile */}
      <MobileHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          />
        )}

        <Aside isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className='flex-1 overflow-y-auto p-4 sm:p-8 bg-white'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout