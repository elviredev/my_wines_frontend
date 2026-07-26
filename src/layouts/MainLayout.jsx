import { Footer, Navbar } from '@/components'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-[#180308] via-[#2b0813] to-[#090203] text-stone-100">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout