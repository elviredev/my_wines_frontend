import { useEffect, useState } from 'react'
import { Button, Loading, SelectInput, WineCard, WineFilters } from '@/components'
import { getWines } from '@/api/wineService'
import useDebounce from '@/hooks/useDebounce'
import { ChevronDown } from 'lucide-react'



const ListingWines = ({ search }) => {

  const [wines, setWines] = useState([])

  const [filters, setFilters] = useState({
    vintage: '',
    region: '',
    min_price: '',
    min_rating: '',
    favorite: false,
    available: false,
    wine_types: [],
  })

  const debouncedVintage = useDebounce(filters.vintage, 600)

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 8,
    total: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // checker si filtres actifs
  const hasFilters =
    debouncedVintage ||
    filters.region ||
    filters.min_price ||
    filters.min_rating ||
    filters.favorite ||
    filters.available ||
    filters.wine_types.length > 0

  // fetch data
  const fetchWines = async (params = {}, append = false) => {
    setLoading(true)
    setError(null)

    try {

      const winesListing = await getWines(params)
      // console.log(winesListing);

      const newWines = winesListing.data || []

      if (append) {
        // ajouter les nouveaux vins à ceux déja affichés
        // @ts-ignore
        setWines((prev) => [
          ...prev,
          ...newWines
        ])
      } else {
        // nouvelle recherche / nouveau filtre
        setWines(newWines)
      }

      setPagination({
        currentPage: winesListing.meta.current_page,
        lastPage: winesListing.meta.last_page,
        perPage: winesListing.meta.per_page,
        total: winesListing.meta.total,
      })

    } catch (err) {

      console.log("Erreur lors du chargement des vins :", err);
      // @ts-ignore
      setError("Impossible de charger la liste des vins")

    } finally {

      setLoading(false)

    }
  }

  const buildParams = (page = pagination.currentPage) => {
    const params = {}

    if (search) {
      params.search = search
    }

    if (debouncedVintage.length === 4) {
      params.vintage = debouncedVintage
    }

    if (filters.region) {
      params.region = filters.region
    }

    if (filters.min_price) {
      params.min_price = filters.min_price
    }

    if (filters.min_rating) {
      params.min_rating = filters.min_rating
    }

    if (filters.favorite) {
      params.favorite = 1
    }

    if (filters.available) {
      params.available = 1
    }

    if (filters.wine_types.length > 0) {
      params.wine_types = filters.wine_types
    }

    // pagination
    params.page = page
    params.per_page = pagination.perPage

    return params

  }

  useEffect(() => {
    const params = buildParams(1)

    fetchWines(params)
  }, [
      search, debouncedVintage, filters.available,
      filters.favorite, filters.min_price,
      filters.min_rating, filters.region, filters.wine_types,
      pagination.perPage
    ]
  )

  const handleLoadMore = async () => {
    const nextPage = pagination.currentPage + 1
    
    if(nextPage > pagination.lastPage) {
      return
    }

    const params = buildParams(nextPage)

    await fetchWines(params, true)
  }


  if (loading) {
    return <Loading text="Chargement des vins..." />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-400">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchWines}
          className="mt-4 rounded-xl bg-rose-700 px-5 py-2.5 font-semibold text-white transition hover:bg-rose-600"
        >
          Réessayer
        </button>
      </div>
    )
  }


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-0 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* wine filters  */}
          <WineFilters
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters)

              setPagination((prev) => ({
                ...prev,
                currentPage: 1,
              }))
            }}
          />

          <main className="lg:col-span-3">
            {/* Header row */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 rounded-2xl border border-rose-900/30 bg-stone-900/30 backdrop-blur-xl p-6">

              <div>
                <h2 className="text-2xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">Le Verre & le Bouchon</h2>
                <p className="text-sm sm:text-lg text-stone-300">Découvrir. Déguster. Collectionner.</p>
                <p className="text-xs sm:text-sm text-stone-400 mt-2">
                  <span className="font-semibold text-rose-600">
                    {pagination?.total ?? 0}
                  </span>{" "}
                  {pagination?.total > 1 ? "bouteilles" : "bouteille"}
                </p>
              </div>

              {/* Per page selector */}
              <div className="w-30">
                <SelectInput
                  name="per_page"
                  value={pagination.perPage}
                  labelClassName="text-stone-300"
                  placeholder="Par page"
                  options={[
                    { value: 8, label: "8 / page" },
                    { value: 18, label: "18 / page" },
                    { value: 50, label: "50 / page" },
                    { value: 100, label: "100 / page" }
                  ]}
                  onChange={(e) => {
                    setPagination((prev) => ({
                      ...prev,
                      perPage: Number(e.target.value),
                      currentPage: 1
                    }))
                  }}
                />
              </div>

            </div>

            {wines.length === 0 ? (
              <div className="rounded-2xl border border-stone-700/50 bg-stone-900/30 backdrop-blur-xl px-6 py-16 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-rose-900/40 bg-rose-900/20 text-2xl">
                  🍷
                </div>

                <h3 className="text-xl font-semibold text-stone-100">
                  {hasFilters ? "Aucun vin trouvé" : "Aucun vin dans la cave"}
                </h3>

                <p className="mt-2 text-sm text-stone-400">
                  {hasFilters ? "Aucun vin ne correspond à vos critères de recherche." : "Votre cave ne contient actuellement aucun vin."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                {/* Wine Cards */}
                {wines.map((wine) => (
                  // @ts-ignore
                  <WineCard key={wine.id} wine={wine} />
                ))}
              </div>
            )}

            {/* Charger plus */}
            {pagination.currentPage < pagination.lastPage && (
              <div className="mt-10 flex justify-center">
                <Button
                  type="button"
                  icon={ChevronDown}
                  onClick={handleLoadMore}
                  variant="notshadow"
                >
                  Charger plus de vins
                </Button>
              </div>
            )}

          </main>

        </div>
      </div>
    </section>
  )
}

export default ListingWines