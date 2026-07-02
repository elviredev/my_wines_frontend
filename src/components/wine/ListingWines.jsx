import { WineCard, WineFilters } from '@/components'


const ListingWines = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-[95%] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* job filters  */}
          <WineFilters />


          <main className="lg:col-span-3">
            {/* Header row */}
            <div className="flex items-center justify-between mt-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Le Verre & le Bouchon</h2>
                <p className="text-lg text-gray-600">Découvrir. Déguster. Collectionner.</p>
                <p className="text-sm text-gray-500 mt-1">
                  12 bouteilles dans la cave
                </p>
              </div>

              {/* Per page selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-gray-500 whitespace-nowrap">Show:</span>
                <select

                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-rose-800 
                  hover:border-rose-800 transition duration-200"
                >
                  <option value=''>9 / page</option>
                  <option value=''>18 / page</option>
                  <option value=''>50 / page</option>
                  <option value=''>100 / page</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Wine Cards */}
              <WineCard />

            </div>
          </main>

        </div>
      </div>
    </section>
  )
}

export default ListingWines