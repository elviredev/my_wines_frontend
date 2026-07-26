import { WineCard, WineFilters } from '@/components'


const ListingWines = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* job filters  */}
          <WineFilters />


          <main className="lg:col-span-3">
            {/* Header row */}
            <div className="mb-10 flex items-center justify-between rounded-2xl border border-rose-900/30 bg-stone-900/30 backdrop-blur-xl p-6">
              <div>
                <h2 className="text-md sm:text-3xl font-bold text-stone-100 tracking-tight">Le Verre & le Bouchon</h2>
                <p className="text-sm sm:text-lg text-stone-300">Découvrir. Déguster. Collectionner.</p>
                <p className="text-xs sm:text-sm text-stone-400 mt-2">
                  <span className="font-semibold text-rose-600">12</span> bouteilles dans la cave
                </p>
              </div>

              {/* Per page selector */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-sm text-stone-400 whitespace-nowrap">Par page :</span>
                <select
                  className="text-sm border border-stone-700 bg-stone-900/60 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-rose-600 
                  hover:border-rose-700 transition duration-200"
                >
                  <option value=''>9 / page</option>
                  <option value=''>18 / page</option>
                  <option value=''>50 / page</option>
                  <option value=''>100 / page</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
              {/* Wine Cards */}
              <WineCard />
              <WineCard />

            </div>
          </main>

        </div>
      </div>
    </section>
  )
}

export default ListingWines