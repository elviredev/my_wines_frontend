import hero from "@/assets/images/hero-bg.jpg"
import { Button, WineShowcase, ListingWines, ScrollToTopButton } from "@/components"
import { Search } from "lucide-react"


const Home = () => {
  return (
    <main>
      <div className="relative bg-gray-900 overflow-hidden h-auto md:h-125 flex items-center">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-50"
            src={hero}
            alt="Deux verres de vin"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-linear-to-br from-rose-950/80 via-black/30 to-stone-950/70" />

        <div className="relative max-w-7xl mx-auto py-14 md:py-18 px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
              Ma collection de{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-700 via-rose-500 to-olive-500">
                vins d'exception
              </span>
            </h1>
            <p className="mt-4 font-serif text-xl sm:text-2xl text-olive-300 max-w-xl mx-auto">
              Ma cave numérique pour organiser, retrouver et apprécier chaque bouteille.
            </p>
          </div>

          {/* Search form */}
          <form

            className="max-w-3xl mx-auto bg-stone-900/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl shadow-black/50">
            <div className="flex flex-col md:flex-row items-center gap-3">

              {/* Keyword */}
              <div className="grow relative w-full md:w-auto">
                <label htmlFor="keyword" className="sr-only">Nom de vin ou Mot-clé</label>
                <div className="relative border border-stone-700 bg-black/20 rounded-xl focus-within:border-rose-500 hover:border-rose-700 transition duration-200">
                  <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-rose-700"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="keyword"
                    placeholder="Nom de vin, mot-clé..."
                    className="w-full pl-11 pr-3 py-3 text-sm bg-stone-950/60 text-stone-100 focus:outline-none focus:ring-0 placeholder:text-stone-500 rounded-xl"
                    style={{ border: "none" }}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grow relative w-full md:w-auto">
                <label htmlFor="location" className="sr-only">Millésime ou Région</label>
                <div className="relative border border-stone-700 bg-black/20 rounded-xl focus-within:border-rose-500 hover:border-rose-700 transition duration-200">
                  <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-rose-700"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    name="location"
                    placeholder="Millésime ou région..."
                    className="w-full pl-11 pr-3 py-3 text-sm bg-stone-950/60 text-stone-100 focus:outline-none focus:ring-0 placeholder:text-stone-500 rounded-xl"
                    style={{ border: "none" }}
                  />
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                icon={Search}
                variant="notshadow"
              >
                Rechercher un vin
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              { label: '🍷 Bouteilles', value: '50+' },
              { label: '🍇 Domaines', value: '22+' },
              { label: '❤️ Favoris', value: '8+' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-stone-900/40 backdrop-blur px-6 py-4 text-center">
                <p className="text-3xl font-bold text-rose-700">{value}</p>
                <p className="text-stone-400 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Effet de fondu en bas du hero */}
        <div
          className="
          absolute
          inset-x-0
          bottom-0
          h-40
          pointer-events-none
          bg-linear-to-b
          from-transparent
          via-stone-950/20
          to-stone-950/90
        "
        />

      </div>
      <WineShowcase />
      <ListingWines />
      <ScrollToTopButton bottom="bottom-38 sm:bottom-24" />
    </main>
  )
}

export default Home