//@ts-nocheck
import { Loading, SortableHeader } from "@/components"
import { Heart, Search, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { getWines } from "@/api/wineService"


const ManageWines = () => {

  const [wines, setWines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState("")

  const [sortBy, setSortBy] = useState(null);
  const [direction, setDirection] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 8,
    total: 0
  })

  // Récupérer les vins depuis l'API
  const fetchWines = async (page = 1, currentSortBy = sortBy, currentDirection = direction) => {

    try {

      setLoading(true)
      setError(null)

      const sort = currentSortBy && currentDirection
        ? currentSortBy === "favorite"
          ? "favorite"
          : `${currentSortBy}_${currentDirection}`
        : undefined

      const response = await getWines({
        search: search || undefined,
        sort: sort,
        page,
        per_page: pagination.perPage
      })

      const winesData = response.data
      const meta = response.meta

      setWines(winesData)

      // @ts-ignore
      setPagination({
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        perPage: meta.per_page,
        total: meta.total
      })

    } catch (error) {

      console.error("Erreur lors du chargement des vins :", error)

      // @ts-ignore
      setError(error.response?.data?.message || "Impossible de charger les vins.")

    } finally {

      setLoading(false)

    }

  }

  // Chargement initial
  useEffect(() => {
    fetchWines()
  }, [])


  // Gérer le tri des colonnes
  const handleSort = (column) => {
    
    const newDirection =
      column === sortBy
        ? direction === "asc"
          ? "desc"
          : "asc"
        : "asc"

    setSortBy(column)
    setDirection(newDirection)

    fetchWines(1, column, newDirection)

  }

  // Recherche
  const handleSearch = (e) => {

    e.preventDefault()

    fetchWines(1)

  }

  // Changement de page
  const handlePageChange = (page) => {

    if (page < 1 || page > pagination.lastPage || page === pagination.currentPage) {
      return
    }

    fetchWines(page)

  }

  return (
    <div className="space-y-12">

      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-white/10 bg-stone-900/40 backdrop-blur-xl p-6">

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-stone-200">
            Gérer les vins
          </h1>

          <p className="mt-2 text-stone-400">
            Consultez, modifiez ou supprimez les bouteilles de votre cave.
          </p>
        </div>


        {/* Search form */}
        <form onSubmit={handleSearch} className="w-full lg:w-95">
          <div className="relative">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-600" />

            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un vin..."
              className="w-full pl-11 pr-4 py-3 text-sm border border-stone-700 bg-stone-950/70 text-stone-100 focus:outline-none focus:border-rose-500 
                      placeholder:text-stone-500 rounded-xl transition"
              style={{ border: "none" }}
            />
          </div>
        </form>

      </header>

      {/* Erreur */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Chargement */}
      {loading ? (

        <Loading text="Chargement des vins..." />

      ) : wines.length === 0 ? (

        // Aucun résultat
        <div className="rounded-2xl border border-white/10 bg-stone-900/40 p-10 text-center backdrop-blur-xl">

          <p className="text-stone-400">
            Aucun vin trouvé.
          </p>

        </div>

      ) : (

        <>
          {/* Desktop */}

          <div className="relative hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl">

            <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-rose-800/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-amber-600/5 blur-3xl" />

            <table className="min-w-full">
              <thead className="border-b border-white/10 bg-stone-950/60">
                <tr>
                  <th className="w-20 px-4 py-3"></th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Vin"
                      column="name"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="left"
                    />
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Type"
                      column="wine_type"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="left"
                    />
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Région"
                      column="region"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="left"
                    />
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Millésime"
                      column="vintage"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="center"
                    />
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Note"
                      column="rating"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="center"
                    />
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Prix"
                      column="price"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="center"
                    />
                  </th>

                  {/* <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    <SortableHeader
                      label="Favoris"
                      column="favorite"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                      align="center"
                    />
                  </th> */}
                  
                  {/* Favoris : pas de tri */}
                  <th className="px-4 py-3">
                    <span className="flex w-full items-center justify-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Favoris
                    </span>
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">

                {wines.map((wine) => (

                  <tr
                    key={wine.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >

                    {/* Image */}
                    <td className="px-4 py-3">
                      {wine.image ? (
                        <img
                          src={wine.image}
                          alt={wine.name}
                          className="h-16 w-12 rounded object-cover border border-white/10"
                        />
                      ) : (
                        <div className="flex h-16 w-12 items-center justify-center rounded border border-white/10 bg-stone-800 text-xs text-stone-500">
                          —
                        </div>
                      )}
                    </td>

                    {/* Vin */}
                    <td className="text-left px-4 py-3">
                      <p className="font-semibold text-stone-200">
                        {wine.name}
                      </p>

                      <p className="text-sm text-stone-400">
                        {wine.appellation}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="text-left px-4 py-3">
                      <span className="rounded-full bg-rose-900/30 border border-rose-700/30 text-rose-200 px-3 py-1 text-xs font-medium">
                        {wine.wine_type}
                      </span>
                    </td>

                    {/* Région */}
                    <td className="text-left px-4 py-3 text-stone-300">
                      {wine.region}
                    </td>

                    {/* Millésime */}
                    <td className="text-center text-stone-300">
                      {wine.vintage}
                    </td>

                    {/* Note */}
                    <td className="text-center">
                      <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">

                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                        {Number(wine.rating)}/20

                      </span>
                    </td>

                    {/* Prix */}
                    <td className="text-center text-stone-300">
                      {wine.price ? `${Number(wine.price).toFixed(2).replace(".", ",")} €` : "-"}
                    </td>

                    {/* Favori */}
                    <td>
                      <div className="flex justify-center">

                        <div className="rounded-full bg-rose-900/30 p-2">

                          <Heart
                            className={`
                              h-4 w-4
                              ${wine.favorite
                                ? "fill-rose-500 text-rose-500"
                                : "text-stone-600"
                              }
                            `}
                          />

                        </div>

                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">

                      <div className="flex justify-center gap-4">

                        <NavLink
                          to={`/dashboard/wines/${wine.slug}/edit`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 transition"
                        >
                          <FaEdit className="ml-1" />
                        </NavLink>

                        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition">
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}


              </tbody>
            </table>

          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-4">

            {wines.map((wine) => (

              <div
                key={wine.id}
                className="rounded-xl border border-white/10 bg-stone-900/40 backdrop-blur-xl p-4 shadow-sm transition-all hover:border-rose-600/40 hover:shadow-md"
              >
                {/* Partie haute */}
                <div className="flex gap-4">

                  {/* Image */}
                  {wine.image ? (
                    <img
                      src={wine.image}
                      alt={wine.name}
                      className="h-28 w-20 rounded-lg border border-stone-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-20 items-center justify-center rounded-lg border border-white/10 bg-stone-800 text-xs text-stone-500">
                      —
                    </div>
                  )}


                  {/* Informations */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-stone-200">
                          {wine.name}
                        </h3>

                        <p className="text-sm text-stone-400">
                          {wine.appellation}
                        </p>
                      </div>

                      <Heart
                        className={`
                          h-5 w-5
                          ${wine.favorite
                            ? "fill-rose-500 text-rose-500"
                            : "text-stone-600"
                          }
                        `}
                      />

                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        {wine.wine_type}
                      </span>

                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                        {wine.region}
                      </span>

                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                        {wine.vintage}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Notes, prix ... */}

                <div className="mt-5 grid grid-cols-2 gap-y-4 rounded-lg bg-stone-950/50 border border-white/5 p-4">

                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Note</p>
                    <p className="font-semibold text-amber-400">
                      ⭐ {Number(wine.rating)}/20
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Prix</p>
                    <p className="font-semibold text-stone-200">
                      {wine.price
                        ? `${Number(wine.price).toFixed(2).replace(".", ",")} €`
                        : "—"
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Appellation</p>
                    <p className="text-sm text-stone-200">{wine.appellation || "—"}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-stone-500 uppercase tracking-wider">Cépage</p>
                    <p className="text-sm text-stone-200">{wine.grape || "—"}</p>
                  </div>

                </div>

                {/* Boutons */}
                <div className="mt-5 flex justify-end gap-3 border-t border-white/20 pt-4">

                  <NavLink
                    to={`/dashboard/wines/${wine.slug}/edit`}
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
            ))}


          </div>

          {/* Pagination */}
          {pagination.lastPage > 1 && (

            <div className="flex items-center justify-center gap-2">

              <button
                type="button"
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Précédent
              </button>

              <span className="px-3 text-sm text-stone-400">
                Page {pagination.currentPage} sur {pagination.lastPage}
              </span>

              <button
                type="button"
                disabled={pagination.currentPage === pagination.lastPage}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Suivant
              </button>

            </div>

          )}

        </>

      )}

    </div>
  )
}

export default ManageWines