import { useEffect, useState } from 'react'
import { SelectInput, WineCard, WineFilters } from '@/components'
import { getWines } from '@/api/wineService'


const ListingWines = () => {

  const [wines, setWines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // fetch data
  useEffect(() => {
    const fetchWines = async () => {
      setLoading(true)
      setError(null)

      try {
        const winesListing = await getWines()
        // console.log(winesListing);

        setWines(winesListing|| [])
      } catch (err) {
        console.log("Error:", err);
        // @ts-ignore
        setError("Impossible de charger la liste des vins")
      } finally {
        setLoading(false)
      }
    }

    fetchWines()

  }, [])

  if (loading) {
    return <p className="text-stone-300">Chargement des vins...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-0 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* job filters  */}
          <WineFilters />


          <main className="lg:col-span-3">
            {/* Header row */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 rounded-2xl border border-rose-900/30 bg-stone-900/30 backdrop-blur-xl p-6">
              <div>
                <h2 className="text-2xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">Le Verre & le Bouchon</h2>
                <p className="text-sm sm:text-lg text-stone-300">Découvrir. Déguster. Collectionner.</p>
                <p className="text-xs sm:text-sm text-stone-400 mt-2">
                  <span className="font-semibold text-rose-600">12</span> bouteilles dans la cave
                </p>
              </div>

              {/* Per page selector */}
              <div className="w-30">
                <SelectInput
                  name="wine_type"
                  labelClassName="text-stone-300"
                  placeholder="Par page"
                  options={[
                    { value: "sup-9", label: "> 8 / page" },
                    { value: "sup-18", label: "> 18 / page" },
                    { value: "sup-50", label: "> 50 / page" },
                    { value: "sup-100", label: "> 100 / page" }
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
              {/* Wine Cards */}
              {wines.map((wine) => (
                // @ts-ignore
                <WineCard key={wine.id} wine={wine} />
              ))}

            </div>
          </main>

        </div>
      </div>
    </section>
  )
}

export default ListingWines