import { Grape } from 'lucide-react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import ponyo from '@/assets/images/ponyo.jpg'
import { useEffect, useState, useRef } from 'react'

const Navbar = () => {

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const logoClasses = "transition-colors duration-200 group-hover:text-rose-900"
  // classes css pour activer liens navbar et mobile
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium ${isActive
      ? 'text-rose-900'
      : 'text-olive-600 hover:text-rose-900 transition duration-200'
    }`

  const getNavLinkClassMobile = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-medium ${isActive
      ? 'text-rose-900 bg-olive-100'
      : 'text-olive-600 hover:bg-olive-100 hover:text-rose-900 transition duration-200'
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


  return (

    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-1 group">
            <Grape className={`h-6 w-6 text-rose-800 ${logoClasses}`} />
            <span className={`text-lg font-bold text-olive-700 tracking-tight ${logoClasses}`}>
              My Wines
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-2">

            <div className="flex items-center gap-3">

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 pl-3 pr-1 py-1 rounded-xl hover:bg-olive-100 border border-transparent hover:border-gray-200 transition duration-200 group"
                >
                  <p className="text-sm font-semibold text-olive-600 group-hover:text-rose-900 transition hidden md:block">
                    Hello, Elvire
                  </p>
                  <img
                    src={ponyo}
                    alt="Profil"
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-lg object-cover border-2 border-gray-100"
                  />
                  {/* <svg className={`w-3.5 h-3.5 text-gray-400 transition duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg> */}

                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 overflow-hidden">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-800 truncate">Elvire</p>
                      <p className="text-xs text-olive-400 truncate">elviredev@gmail.com</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to='/dashboard/profile'
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-olive-100 hover:text-rose-900 transition"
                      >
                        <svg className="w-4 h-4 text-olive-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Gérer son Profil
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 font-semibold hover:bg-red-50 transition"
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
            </div>

            <div className="flex items-center gap-2">
              <NavLink to="/dashboard" className={getNavLinkClass}>
                Tableau de Bord
              </NavLink>

              <NavLink
                to="/login"
                className="bg-linear-to-r from-rose-700 to-red-800 hover:from-rose-800 hover:to-red-900 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm shadow-rose-300"
              >
                Login
              </NavLink>
            </div>

          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuMobileOpen(!menuMobileOpen)}
            className="sm:hidden p-2 rounded-xl text-gray-500 hover:text-rose-800 hover:bg-purple-50 transition duration-200"
          >
            {menuMobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuMobileOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-1">

            {/* User info */}

            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-olive-100 rounded-xl mx-1">
              <img
                src={ponyo}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">Elvire</p>
                <p className="text-xs text-olive-500 truncate">elviredev@gmail.com</p>
              </div>
            </div>

            <>

              <NavLink
                to="/dashboard"
                onClick={() => setMenuMobileOpen(false)}
                className={getNavLinkClassMobile}
              >
                Tableau de Bord
              </NavLink>

              <NavLink
                to='/dashboard/profile'
                onClick={() => setMenuMobileOpen(false)}
                className={getNavLinkClassMobile}
              >
                Gérer son Profil
              </NavLink>
              <div className="pt-2 border-t border-gray-100 mt-2">
                <button
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </>

            <>
              <div className="px-1 pt-1">
                <NavLink
                  to="/login"
                  onClick={() => setMenuMobileOpen(false)}
                  className="block w-full text-center bg-linear-to-r from-rose-600 to-red-800 hover:from-rose-800 hover:to-red-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300"
                >
                  Login
                </NavLink>
              </div>
            </>

          </div>
        )}

      </nav>
    </div>
  )
}

export default Navbar