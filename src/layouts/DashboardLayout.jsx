import { Aside } from '@/components'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Header mobile */}

      {/* Overlay */}

      <Aside />

      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout