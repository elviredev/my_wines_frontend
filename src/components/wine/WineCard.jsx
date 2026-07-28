import { NavLink } from 'react-router-dom'
import defaultImage from "@/assets/images/default_image.jpg"
import { FaCalendarAlt, FaTag, FaWineGlassAlt } from 'react-icons/fa'
import { Star } from 'lucide-react'

const WineCard = () => {

  const WineTypeStyles = {
    rouge: "bg-red-900/25 border border-red-700/30 text-red-300",
    blanc: "bg-yellow-900/25 border border-yellow-700/30 text-yellow-300",
    rosé: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
    rose: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
    champagne: "bg-sky-900/25 border border-sky-700/30 text-sky-300",
    effervescent: "bg-sky-900/25 border border-sky-700/30 text-sky-300",
    orange: "bg-orange-900/25 border border-orange-700/30 text-orange-300",
    default: "bg-stone-800 border border-stone-700 text-stone-300",
  }

  const WineTypeBadge = ({ type }) => {
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

    <div className="group rounded-2xl border border-rose-900/25 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:border-rose-600/40 hover:-translate-y-1 transition-all duration-300
    p-5 flex flex-col">
  {/* Partie haute */}
  <div className="flex flex-col sm:flex-row gap-6">

    {/* Image */}
    <div className="shrink-0">
      <div className="w-full sm:w-32 md:w-36 h-56 sm:h-44 md:h-48 shrink-0 rounded-xl overflow-hidden border border-stone-700 bg-stone-950">
        <img
          src={defaultImage}
          alt=""
          className="w-full h-full object-contain bg-stone-950 p-3"
        />
      </div>
    </div>

    {/* Contenu */}
    <div className="flex-1 flex flex-col">

      {/* Nom */}
      <h2 className="text-xl md:text-2xl font-semibold text-stone-100 group-hover:text-rose-300 transition-colors">
        Entre Ciel et mer
      </h2>

      <p className="mt-1 text-stone-400">
        Les Domaines Auriol
      </p>

      <p className="mt-2 font-medium text-rose-300">
        Pays d'Oc
      </p>

      {/* Note */}
      <div className="mt-5">
        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border border-amber-500/30
            bg-amber-500/10
            px-4 py-2
            text-amber-300
            font-bold
          "
        >
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          16.5 /20
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 text-sm leading-7 text-stone-400 line-clamp-2 md:line-clamp-3">
        Robe saumon clair et brillante. Floral et épicé au nez. En bouche,
        arômes exotiques, pamplemousse rose, et des tannins fins qui
        équilibrent. Réelle sensation de légèreté, de par ses 10% d’alcool.
        Rafraîchissant.
      </p>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">

        <span className="inline-flex items-center gap-1 rounded-full border border-stone-700 bg-stone-800 px-3 py-1 text-xs font-semibold text-stone-300">
          <FaCalendarAlt className="text-[10px]" />
          2025
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-rose-700/30 bg-rose-900/25 px-3 py-1 text-xs font-semibold text-rose-300">
          <FaTag className="text-[10px]" />
          8–12 €
        </span>

        <WineTypeBadge type="Rosé" />

      </div>

    </div>

  </div>

  {/* Footer */}
  <div className="mt-6 border-t border-stone-700/50 pt-5">
    <NavLink
      to="/wine/la-charnivole-2023"
      className="
        block
        w-full
        rounded-xl
        bg-linear-to-r
        from-rose-700
        to-red-900
        py-3
        text-center
        font-semibold
        text-white
        transition
        hover:from-rose-600
        hover:to-red-800
      "
    >
      Découvrir →
    </NavLink>
  </div>

</div>



    // <div className="group rounded-2xl border border-rose-900/25 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 
    // hover:shadow-2xl hover:border-rose-600/40 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between">

    //   <div>
    //     <div className="flex items-start gap-5 mb-5">
    //       {/* Image */}
    //       <div className="w-28 h-28 shrink-0 rounded-xl bg-stone-950/80 border border-stone-700 flex items-center justify-center overflow-hidden">

    //         <img
    //           src={defaultImage}
    //           alt=''
    //           className="w-full h-full object-cover rounded-xl"
    //         />

    //         <svg className="w-6 h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    //         </svg>

    //       </div>

    //       {/* Nom + Domaine + Appellation + Note */}
    //       <div className="flex-1 min-w-0">
    //         <div className="min-w-0 flex-1">
    //           <h2 className="text-lg font-bold text-stone-100 leading-snug line-clamp-2 group-hover:text-rose-300 transition-colors">
    //             Entre Ciel et mer
    //           </h2>
    //           <p className="mt-1 text-sm text-stone-400 truncate">Les Domaines Auriol</p>
    //           <p className="text-xs text-rose-300 font-medium mt-1">
    //             Pays d'Oc
    //           </p>
    //         </div>

    //         <div className="mt-3">
    //           <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
    //             <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
    //             16.5 /20
    //           </span>    
    //         </div>

    //         {/* <div className="shrink-0">
    //           <span className="hidden sm:flex items-center justify-center rounded-xl bg-amber-400/15 border border-amber-500/30 text-sm text-amber-300 font-bold px-3 py-1 ">
    //             16.5
    //           </span>
    //         </div> */}
    //       </div>

    //     </div>

    //     {/* Description */}
    //     <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 mb-4">
    //       Robe saumon clair et brillante. Floral et épicé au nez. En bouche, arômes exotiques, pamplemousse rose, et des tannins fins qui équilibrent. Réelle sensation de légèreté, de par ses 10% d’alcool. Rafraîchissant
    //     </p>

    //     {/* Tags */}
    //     <div className="flex flex-wrap gap-2 mb-5">
    //       <span className="inline-flex items-center gap-1 text-xs font-semibold bg-stone-800 border border-stone-700 text-stone-300 px-2.5 py-1 rounded-full">
    //         <FaCalendarAlt className="text-[10px]" />
    //         2025
    //       </span>
    //       <span className="inline-flex items-center gap-1 text-xs font-semibold bg-rose-900/25 border border-rose-700/30 text-rose-300 px-2.5 py-1 rounded-full">
    //         <FaTag className="text-[10px]" />
    //         8–12 €
    //       </span>
    //       <WineTypeBadge type="Rosé" />
    //     </div>
    //   </div>

    //   {/* Bottom — divider + button */}
    //   <div className="border-t border-stone-700/50 pt-4">
    //     <NavLink
    //       to="/wine/la-charnivole-2023"
    //       className="w-full bg-linear-to-r from-rose-700/90 to-red-900/90 hover:from-rose-800 hover:to-red-900 text-white text-center rounded-xl px-6 py-3 text-sm font-semibold 
    //       transition duration-200 shadow-lg shadow-rose-950/40 whitespace-nowrap disabled:opacity-50 cursor-pointer inline-block"
    //     >
    //       Découvrir →
    //     </NavLink>
    //   </div>

    // </div>
  )
}

export default WineCard