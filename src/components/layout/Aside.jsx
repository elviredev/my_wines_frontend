// @ts-nocheck

import { NavLink } from "react-router-dom"
import { FaPlusCircle, FaWineBottle, FaUserEdit, FaTimes } from "react-icons/fa"
import { MdDashboard } from "react-icons/md";
import { getImageUrl } from "@/utils/image";

import { useAuth } from "@/contexts/AuthContext";

const Aside = ({ isOpen, toggleSidebar }) => {

  const { user, isAuthenticated, logout } = useAuth()

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg ${isActive
      ? 'bg-rose-900/35 border border-rose-700/30 text-rose-200 shadow-lg shadow-rose-950/30'
      : 'text-stone-400 hover:bg-white/5 hover:text-stone-100 transition duration-200'
    }`

  // logout
  const handleLogout = async () => {
    await logout()
  }

  return (
    <aside
      className={
        `fixed inset-y-0 left-0 z-50 w-64 bg-linear-to-b from-[#24070d]/95 via-[#1b090f]/95 to-[#120306]/95 backdrop-blur-xl text-stone-100 
        transform transition-transform duration-300 ease-in-out border-r border-rose-900/25 shadow-2xl shadow-black/40 
        lg:translate-x-0 lg:static lg:inset-0 lg:z-0 lg:shadow-none 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      }
    >
      <div className="p-6 text-sm border-b border-stone-500/30 text-stone-400 uppercase flex justify-between items-center">
        Pôle Administration
        <button onClick={toggleSidebar} className="text-rose-800 lg:hidden">
          <FaTimes size={22} />
        </button>
      </div>
      <nav className="grow p-4">
        <ul className="space-y-6">
          <li>
            <NavLink
              to='/dashboard'
              end
              className={getNavLinkClass}
            >
              <MdDashboard className="w-6 h-6" />
              <span className="ml-3">Tableau de Bord</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/dashboard/wines/create'
              className={getNavLinkClass}
            >
              <FaPlusCircle className="w-6 h-6" />
              <span className="ml-3">Ajouter un vin</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/dashboard/wines'
              end
              className={getNavLinkClass}
            >
              <FaWineBottle className="w-6 h-6" />
              <span className="ml-3">Gérer les vins</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/dashboard/edit-profile'
              className={getNavLinkClass}
            >
              <FaUserEdit className="w-6 h-6" />
              <span className="ml-3">Mon Profil</span>
            </NavLink>
          </li>
        </ul>

        <div className="mt-10 mx-3 mb-3">
          <div className="relative flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-rose-900/20 group hover:border-rose-900/40 transition-all duration-300">

            {/* Avatar */}
            <div className="relative shrink-0">
              {user.avatar ? (
                <>
                  <img
                    className="w-8 h-8 rounded-lg object-cover shadow-sm ring-2 ring-rose-900/40"
                    src={getImageUrl(user.avatar)}
                    referrerPolicy="no-referrer"
                    alt={`Photo de profil de ${user.name}`}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
                </>

              ) : (
                <div className="h-8 w-8 rounded-lg border-2 border-stone-700 bg-stone-800 flex items-center justify-center text-sm text-stone-300">
                  {user.name?.charAt(0)}
                </div>
              )}
            </div>


            {/* User Info */}
            <div className="flex-1 min-w-0 relative z-10">
              <p className="text-xs font-semibold text-stone-100 truncate leading-none mb-0.5">{user.name}</p>
              <p className="text-[10px] text-stone-400 truncate leading-none">{user.email}</p>
            </div>

            {/* Actions — always visible but subtle */}
            <div className="relative z-10 flex items-center gap-0.5 shrink-0">
              <NavLink
                to="/dashboard/edit-profile"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-olive-400 hover:text-rose-800 hover:bg-stone-800 hover:shadow-sm transition-all duration-150"
                title="Edit Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" />
                </svg>
              </NavLink>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-olive-400 hover:text-red-500 hover:bg-stone-800 hover:shadow-sm transition-all duration-150"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

    </aside>
  )
}

export default Aside