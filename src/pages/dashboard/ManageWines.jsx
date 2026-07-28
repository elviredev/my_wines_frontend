import { Heart, Star } from "lucide-react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"



const ManageWines = () => {

  return (
    <div className="space-y-12">

      <header className="mb-8 rounded-2xl border border-white/10 bg-stone-900/40 backdrop-blur-xl p-6">
        <h1 className="text-3xl font-bold text-stone-200">
          Gérer les vins
        </h1>

        <p className="mt-2 text-stone-400">
          Consultez, modifiez ou supprimez les bouteilles de votre cave.
        </p>
      </header>

      {/* Desktop */}
      <div className="relative hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl">

        <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-rose-800/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-amber-600/5 blur-3xl" />

        <table className="min-w-full">
          <thead className="border-b border-white/10 bg-stone-950/60">
            <tr>
              <th className="w-20 px-4 py-3"></th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
                Vin
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
                Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
                Région
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                Millésime
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                Note
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                Prix
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                Favori
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">

              <td className="px-4 py-3">
                <img
                  src="/images/image-1.jpg"
                  className="h-16 w-12 rounded object-cover border border-white/10"
                />
              </td>

              <td className="px-4 py-3">
                <p className="font-semibold text-stone-200">
                  Château Bellevue
                </p>

                <p className="text-sm text-stone-400">
                  Saint-Émilion
                </p>
              </td>

              <td className="px-4 py-3">
                <span className="rounded-full bg-rose-900/30 border border-rose-700/30 text-rose-200 px-3 py-1 text-xs font-medium">
                  Rouge
                </span>
              </td>

              <td className="px-4 py-3 text-stone-300">
                Bordeaux
              </td>

              <td className="text-center text-stone-300">
                2020
              </td>

              <td className="text-center">
                <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">

                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                  17/20

                </span>
              </td>

              <td className="text-center text-stone-300">
                18,90 €
              </td>

              <td>
                <div className="flex justify-center">

                  <div className="rounded-full bg-rose-900/30 p-2">

                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />

                  </div>

                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <NavLink to="/dashboard/wines/vieilles-vignes-2021/edit" className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 transition">
                    <FaEdit className="ml-1" />
                  </NavLink>

                  <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition">
                    <FaTrash />
                  </button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>

      </div>


      {/* Mobile */}
      <div className="lg:hidden space-y-4">
        <div
          key=""
          className="rounded-xl border border-white/10 bg-stone-900/40 backdrop-blur-xl p-4 shadow-sm transition-all hover:border-rose-600/40 hover:shadow-md"
        >
          {/* Partie haute */}
          <div className="flex gap-4">

            {/* Image */}
            <img
              src="/images/image-1.jpg"
              alt="Château Bellevue"
              className="h-28 w-20 rounded-lg border border-stone-200 object-cover"
            />

            {/* Informations */}
            <div className="flex-1">

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-stone-200">
                    Vieilles Vignes
                  </h3>

                  <p className="text-sm text-stone-400">
                    Château Bellevue
                  </p>
                </div>

                <span className="text-xl">❤️</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                  Rouge
                </span>

                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                  Bordeaux
                </span>

                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                  2020
                </span>

              </div>

            </div>

          </div>

          {/* Notes, prix ... */}

          <div className="mt-5 grid grid-cols-2 gap-y-4 rounded-lg bg-stone-950/50 border border-white/5 p-4">

            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider">Note</p>
              <p className="font-semibold text-amber-400">
                ⭐ 17/20
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-stone-500 uppercase tracking-wider">Prix</p>
              <p className="font-semibold text-stone-200">
                18.90 €
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider">Appellation</p>
              <p className="text-sm text-stone-200">AOP Saint-Émilion</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-stone-500 uppercase tracking-wider">Cépage</p>
              <p className="text-sm text-stone-200">Merlot</p>
            </div>

          </div>

          {/* Boutons */}
          <div className="mt-5 flex justify-end gap-3 border-t border-stone-200 pt-4">

            <NavLink
              to="/dashboard/wines/vieilles-vignes-2021/edit"
              className="flex items-center gap-2 rounded-xl border border-sky-500/30 px-4 py-2.5 text-sm font-medium text-sky-300 transition hover:bg-sky-500/20"
            >
              <FaEdit />
              Modifier
            </NavLink>

            <button
              className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
              <FaTrash />
              Supprimer
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ManageWines