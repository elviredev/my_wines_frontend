import { NavLink } from 'react-router-dom'
import defaultImage from "@/assets/images/default_image.jpg"
import { FaCalendarAlt, FaTag, FaWineGlassAlt } from 'react-icons/fa'

const WineCard = () => {

  const WineTypeStyles = {
    rouge: "bg-red-100 text-red-700",
    blanc: "bg-yellow-100 text-yellow-700",
    rosé: "bg-pink-100 text-pink-700",
    rose: "bg-pink-100 text-pink-700", // au cas où les données n'ont pas d'accent
    orange: "bg-orange-100 text-orange-700",
    effervescent: "bg-sky-100 text-sky-700",
    champagne: "bg-sky-100 text-sky-700",
    default: "bg-gray-100 text-gray-600",
  }

  const WineTypeBadge = ({ type }) => {
    const style = WineTypeStyles[type?.toLowerCase()] || WineTypeStyles.default

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${style}`}
      >
        <FaWineGlassAlt className="text-[10px]"/>
        {type}
      </span>
    )
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 p-5 flex flex-col justify-between">

      <div>
        <div className="flex items-start gap-4 mb-4">
          {/* Image */}
          <div className="w-20 h-20 shrink-0 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center overflow-hidden">

            <img
              src={defaultImage}
              alt=''
              className="w-full h-full object-cover rounded-xl"
            />

            <svg className="w-6 h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>

          </div>

          {/* Nom + Domaine + Appellation + Note */}
          <div className="flex justify-between gap-5">
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-rose-700 transition duration-200">
                Entre Ciel et mer
              </h2>
              <p className="text-sm text-gray-500 mt-0.5 truncate">Les Domaines Auriol</p>
              <p className="text-xs text-rose-700 font-medium mt-1">
                Pays d'Oc
              </p>
            </div>

            <div className="shrink-0">
              <span className="hidden sm:flex bg-olive-300 text-rose-800 text-sm font-bold px-2 py-1 rounded-lg">
                16.5
              </span>
            </div>
          </div>

        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          Robe saumon clair et brillante. Floral et épicé au nez. En bouche, arômes exotiques, pamplemousse rose, et des tannins fins qui équilibrent. Réelle sensation de légèreté, de par ses 10% d’alcool. Rafraîchissant
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-olive-200 text-olive-800 px-2.5 py-1 rounded-full">
            <FaCalendarAlt className="text-[10px]" />
            2025
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full">
            <FaTag className="text-[10px]" />
            8–12 €
          </span>
          <WineTypeBadge type="Rosé" />          
        </div>
      </div>

      {/* Bottom — divider + button */}
      <div className="border-t border-gray-100 pt-4">
        <NavLink
          to="/wine/la-charnivole-2023"
          className="w-full bg-linear-to-r from-rose-700/90 to-red-900/90 hover:from-rose-800 hover:to-red-900 text-white text-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 shadow-md shadow-rose-200 whitespace-nowrap disabled:opacity-50 cursor-pointer inline-block"
        >
          Découvrir →
        </NavLink>
      </div>

    </div>
  )
}

export default WineCard