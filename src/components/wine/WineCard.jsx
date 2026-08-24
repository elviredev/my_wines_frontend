import { NavLink } from 'react-router-dom'
import defaultImage from "@/assets/images/default_image.jpg"
import { FaCalendarAlt, FaTag, FaWineGlassAlt } from 'react-icons/fa'
import { Star } from 'lucide-react'

const WineCard = ({ wine }) => {

  const WineTypeStyles = {
    rouge: "bg-red-900/25 border border-red-700/30 text-red-300",
    blanc: "bg-yellow-900/25 border border-yellow-700/30 text-yellow-300",
    rosé: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
    rose: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
    champagne: "bg-purple-900/25 border border-purple-700/30 text-purple-300",
    spiritueux: "bg-sky-900/25 border border-sky-700/30 text-sky-300",
    orange: "bg-orange-900/25 border border-orange-700/30 text-orange-300",
    default: "bg-stone-800 border border-stone-700 text-stone-300",
  }

  const WineTypeBadge = ({ type = "Autre" }) => {
    const style = WineTypeStyles[type?.toLowerCase()] || WineTypeStyles.default

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${style}`}
      >
        <FaWineGlassAlt className="text-[10px]" />
        {type}
      </span>
    )
  }

  return (

    <div className="group rounded-2xl border border-rose-900/25 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:border-rose-600/40 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col h-full">

      {/* Contenu principal */}
      <div className="flex-1">

        {/* Image + informations */}
        <div className="flex flex-col sm:flex-row gap-6">

          {/* Image */}
          <div className="shrink-0">
            <div className="w-full sm:w-32 md:w-36 h-56 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-stone-700 bg-stone-950">

              {wine.image ? (
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-full object-contain bg-stone-950 p-3"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
              ) : (
                <img
                  src={defaultImage}
                  alt=""
                  className="w-full h-full object-contain bg-stone-950 p-3"
                />
              )}

            </div>
          </div>

          {/* Informations */}
          <div className="flex-1 flex flex-col">

            {/* Nom */}
            <h2 className="text-xl md:text-2xl font-semibold text-stone-100 group-hover:text-rose-300 transition-colors">
              {wine.name}
            </h2>

            {/* Domaine */}
            {wine.domain && (
              <p className="mt-1 text-stone-400">
                {wine.domain}
              </p>
            )}

            {/* Région */}
            {wine.region && (
              <p className="mt-2 font-medium text-rose-300">
                {wine.region}
              </p>
            )}

            {/* Note */}
            {wine.rating !== null && (
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-300 font-bold">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {Number(wine.rating)} /20
                </span>
              </div>
            )}

          </div>

        </div>

        {/* Description */}
        {wine.description && (
          <p className="mt-6 text-sm leading-7 text-stone-400 line-clamp-2 md:line-clamp-3">
            {wine.description}
          </p>
        )}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">

          <span className="inline-flex items-center gap-1 rounded-full border border-stone-700 bg-stone-800 px-3 py-1 text-xs font-semibold text-stone-300">
            <FaCalendarAlt className="text-[10px]" />
            {wine.vintage}
          </span>

          {wine.price !== null && (
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-700/30 bg-rose-900/25 px-3 py-1 text-xs font-semibold text-rose-300">
              <FaTag className="text-[10px]" />
              {wine.price.replace(".", ",")} €
            </span>
          )}

          <WineTypeBadge type={wine.wine_type} />

        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-stone-700/50">

        <NavLink
          to={`/wines/${wine.slug}`}
          className="block w-full rounded-xl bg-linear-to-r from-rose-700 to-red-900 py-3 text-center font-semibold text-white transition hover:from-rose-600 hover:to-red-800"
        >
          Découvrir →
        </NavLink>

      </div>

    </div>

  )
}

export default WineCard