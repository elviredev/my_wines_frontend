// @ts-nocheck

import { Grape, LogInIcon } from 'lucide-react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getImageUrl } from '@/utils/image'

const Navbar = () => {

  const { user, isAuthenticated, logout } = useAuth()

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)

  const logoClasses = "transition-colors duration-200 group-hover:text-rose-300"
  // classes css pour activer liens navbar et mobile
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium ${isActive
      ? 'text-rose-300'
      : 'text-stone-300 hover:text-rose-300 transition duration-200'
    }`

  const getNavLinkClassMobile = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-medium ${isActive
      ? 'bg-rose-900/20 text-rose-300'
      : 'text-stone-300 hover:bg-stone-800 hover:text-rose-300 transition duration-200'
    }`

  // fermer la dropdown en cliquant endehors
  // le navigateur n'écoute les clics globaux que lorsque la dropdown est ouverte, et pas en permanence
  useEffect(() => {
    // fermer dropdown si dropdown existe ET clic n'a pas eu lieu sur un elt dans la dropdown
    const handleClickOutside = (e) => {
      // @ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) document.addEventListener('pointerdown', handleClickOutside)

    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [isDropdownOpen])

  // logout
  const handleLogout = async () => {
    setIsDropdownOpen(false)
    setMenuMobileOpen(false)

    await logout()
  }


  return (

    <div className="bg-stone-950/70 backdrop-blur-xl border-b border-rose-900/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <Grape className={`h-6 w-6 text-rose-400 ${logoClasses}`} />
            <span className={`text-2xl font-serif font-semibold text-stone-100 tracking-tight ${logoClasses}`}>
              Le Verre & le Bouchon
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-2">

            <div className="flex items-center gap-3">

              {/* Utilisateur connecté */}
              {isAuthenticated && user && (

                <>
                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2.5 pl-3 pr-1 py-1 rounded-xl hover:bg-stone-800/70 border border-transparent hover:border-rose-900/30 
                      transition duration-200 group"
                    >
                      <p className="text-sm font-semibold text-stone-300 group-hover:text-rose-300 transition hidden md:block">
                        Bonjour, {user.name}
                      </p>

                      {user.avatar ? (
                        <img
                          src={getImageUrl(user.avatar)}
                          alt={`Photo de profil de ${user.name}`}
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-lg object-cover border-2 border-stone-700"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-lg border-2 border-stone-700 bg-stone-800 flex items-center justify-center text-sm text-stone-300">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}

                    </button>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-stone-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-rose-900/20 z-50 py-2 overflow-hidden">

                        {/* User info */}
                        <div className="px-4 py-3 border-b border-stone-700/50">
                          <p className="text-xs font-bold text-stone-100 truncate">{user.name}</p>
                          <p className="text-xs text-stone-400 truncate">{user.email}</p>
                        </div>

                        {/* Profil */}
                        <div className="py-1">
                          <Link
                            to='/dashboard/edit-profile'
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-300 hover:bg-stone-800 hover:text-rose-300 transition"
                          >
                            <svg className="w-4 h-4 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Gérer son Profil
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-stone-700/50 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 font-semibold hover:bg-red-900/20 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Dashboard */}
                  <NavLink to="/dashboard" className={getNavLinkClass}>
                    Tableau de Bord
                  </NavLink>
                </>

              )}

              {/* Utilisateur non connecté */}
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  className="self-start inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-rose-700 to-red-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-rose-800 hover:to-red-900"
                >
                  <LogInIcon className="h-4 w-4" />
                  Login
                </NavLink>
              )}

            </div>

          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuMobileOpen(!menuMobileOpen)}
            className="sm:hidden p-2 rounded-xl text-stone-400 hover:text-rose-300 hover:bg-stone-800 transition duration-200"
          >
            {menuMobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuMobileOpen && (
          <div className="sm:hidden border-t border-stone-800 py-3 space-y-1">

            {/* Utilisateur connecté */}
            {isAuthenticated && user && (

              <>
                {/* User info */}
                <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-stone-800 border border-stone-700 rounded-xl mx-1">

                  {user.avatar ? (
                    <img
                      src={getImageUrl(user.avatar)}
                      alt={`Photo de profil de ${user.name}`}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-xl object-cover border-2 border-stone-700 shadow-sm"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-xl border-2 border-stone-700 bg-stone-900 flex items-center justify-center text-stone-300">
                      {user.name?.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-stone-100 truncate">{user.name}</p>
                    <p className="text-xs text-stone-400 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Dashboard */}
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuMobileOpen(false)}
                  className={getNavLinkClassMobile}
                >
                  Tableau de Bord
                </NavLink>

                {/* Profil */}
                <NavLink
                  to='/dashboard/edit-profile'
                  onClick={() => setMenuMobileOpen(false)}
                  className={getNavLinkClassMobile}
                >
                  Gérer son Profil
                </NavLink>

                {/* Logout */}
                <div className="pt-2 border-t border-stone-700/50 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-900/20 transition duration-200"
                  >
                    Logout
                  </button>
                </div>

              </>
            )}

            {/* Utilisateur non connecté */}
            {!isAuthenticated && (

              <div className="px-1 pt-1">
                <NavLink
                  to="/login"
                  onClick={() => setMenuMobileOpen(false)}
                  className="block w-full text-center bg-linear-to-r from-rose-600 to-red-800 hover:from-rose-800 hover:to-red-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300"
                >
                  Login
                </NavLink>
              </div>
            )}

          </div>
        )}

      </nav>
    </div>
  )
}

export default Navbar