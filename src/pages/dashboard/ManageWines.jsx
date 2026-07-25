import { FaEdit, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"



const ManageWines = () => {

  return (
    <div className="space-y-12">

      <header className="mb-6 pb-5 border-b border-gray-300">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Gérer les vins
        </h1>
      </header>

      {/* Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-stone-200 bg-stone-50">
            <tr>
              <th className="w-20 px-4 py-3"></th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Vin
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                Région
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
                Millésime
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
                Note
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
                Prix
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
                Favori
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200">
            <tr className="hover:bg-rose-100/50 transition-colors duration-200">

              <td className="px-4 py-3">
                <img
                  src="/images/image-1.jpg"
                  className="h-16 w-12 rounded object-cover border border-stone-200"
                />
              </td>

              <td className="px-4 py-3">
                <p className="font-semibold text-stone-900">
                  Château Bellevue
                </p>

                <p className="text-sm text-stone-500">
                  Saint-Émilion
                </p>
              </td>

              <td className="px-4 py-3">
                <span className="rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-medium">
                  Rouge
                </span>
              </td>

              <td className="px-4 py-3 text-stone-600">
                Bordeaux
              </td>

              <td className="text-center">
                2020
              </td>

              <td className="text-center font-semibold text-amber-600">
                ⭐ 17/20
              </td>

              <td className="text-center">
                18,90 €
              </td>

              <td className="text-center">
                ❤️
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <NavLink to="/dashboard/wines/vieilles-vignes-2021/edit" className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </NavLink>

                  <button className="text-red-600 hover:text-red-800">
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
          className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:border-rose-300 hover:shadow-md"
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
                  <h3 className="font-semibold text-stone-900">
                    Vieilles Vignes
                  </h3>

                  <p className="text-sm text-stone-500">
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

          {/* Informations */}          

          <div className="mt-5 grid grid-cols-2 gap-y-4 rounded-lg bg-stone-50 p-4">

            <div>
              <p className="text-xs uppercase text-stone-500">Note</p>
              <p className="font-semibold text-amber-600">
                ⭐ 17/20
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase text-stone-500">Prix</p>
              <p className="font-semibold">
                18.90 €
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-stone-500">Appellation</p>
              <p className="text-sm">AOP Saint-Émilion</p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase text-stone-500">Cépage</p>
              <p className="text-sm">Merlot</p>
            </div>

          </div>

          {/* Boutons */}
          <div className="mt-5 flex justify-end gap-3 border-t border-stone-200 pt-4">

            <NavLink
              to="/dashboard/wines/vieilles-vignes-2021/edit"
              className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              <FaEdit />
              Modifier
            </NavLink>

            <button
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
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