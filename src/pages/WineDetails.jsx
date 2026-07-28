import { Button, InfoRow } from "@/components"
import ScrollToTopButton from "@/components/ui/ScrollToTopButton"
import { GrapeIcon, InfoIcon, NotepadTextIcon, Pencil, Trash2 } from "lucide-react"
import { NavLink } from "react-router-dom"


const WineDetails = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8 lg:px-10 lg:py-10 max-w-7xl">

        {/* ── Hero Header ─────────────────────────────────────── */}
        <header className="relative bg-linear-to-br from-stone-950 via-[#31181d] to-stone-900 rounded-2xl shadow-xl mb-8 overflow-hidden">

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <div className="absolute top-8 left-10 h-20 w-20 rounded-full border border-white/8" />

            <div className="absolute top-28 left-28 h-10 w-10 rounded-full bg-white/5 blur-[2px]" />

            <div className="absolute top-48 left-16 h-6 w-6 rounded-full border border-white/10" />

            <div className="absolute top-20 left-40 h-4 w-4 rounded-full bg-white/6 blur-[1px]" />

            <div className="absolute top-58 left-32 h-3 w-3 rounded-full border border-white/15" />


            <GrapeIcon
              className="absolute -right-16 -bottom-14 w-80 h-80 text-white/4"
              strokeWidth={0.4}
            />

            <div className="absolute -right-36 -bottom-36 h-118 w-lg rounded-full bg-radial from-white/6 via-white/2 to-transparent" />

          </div>


          <div className="relative grid md:grid-cols-[320px_1fr] items-center gap-16 px-8 py-8">
            {/* Bouteille */}
            <div className="flex justify-center">
              <img
                src="/images/menetou-salon.webp"
                alt=""
                className="h-50 sm:h-80 w-auto drop-shadow-2xl"
              />
            </div>

            {/* Infos */}
            <div className="flex items-center">
              <div className="text-white">

                <span className="inline-flex items-center gap-2 rounded-full bg-rose-900/20 backdrop-blur border border-rose-800/30 px-4 py-2 text-sm text-stone-200">
                  🍷 Blanc
                </span>

                <h1 className="mt-6 text-2xl sm:text-5xl font-serif font-bold">
                  Menetou Salon 2023
                </h1>

                <p className="mt-4 text-xl sm:text-3xl font-serif font-semibold text-rose-100">
                  Domaine du Grand Brussy
                </p>

                <p className="mt-2 text-lg text-rose-200 font-medium">
                  AOP Menetou-Salon
                </p>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Ma note</span>
                    <span className="font-bold text-white">16 / 20</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-amber-500 to-yellow-300"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                    🇫🇷 Val de Loire
                  </span>

                  <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                    💰 14,90 €
                  </span>

                  <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                    ❤️ Favori
                  </span>
                </div>

                {/* Boutons */}
                <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap gap-4">
                  <NavLink
                    to="/dashboard/wines/vieilles-vignes-2021/edit"
                    className="rounded-xl px-6 py-3 text-sm sm:text-base font-semibold transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-rose-700/90 to-red-900/90 hover:from-rose-800 
                    hover:to-red-900 hover:shadow-md text-white"
                  >
                    <Pencil className="h-4 w-4" />
                    Modifier
                  </NavLink>

                  <Button
                    variant="outline"
                    icon={Trash2}
                  >
                    Supprimer
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </header>

        {/* ── Content Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <main className="lg:col-span-2 space-y-6">

            {/* Description */}
            <section className="bg-stone-900/40 rounded-2xl shadow-xl shadow-black/20 border border-rose-900/25 overflow-hidden">
              <div className="border-l-4 border-rose-700 px-6 py-5">
                <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-900/20 rounded-lg flex items-center justify-center">
                    <InfoIcon className="w-4 h-4 text-rose-700" />
                  </span>
                  À propos
                </h2>
              </div>

              <div className="px-6 pb-6">
                <p className="text-stone-300 leading-relaxed">Le Menetou Salon est un vin blanc du Centre Val de Loire aux arômes de fruits exotiques, de pêche, de fleurs des champs. Bouche tendre, souple et d'une grande fraîcheur.</p>
              </div>
            </section>

            {/* Caractéristiques */}
            <section className="bg-stone-900/40 rounded-2xl shadow-xl shadow-black/20 border border-rose-900/25 overflow-hidden">
              <div className="border-l-4 border-stone-500 px-6 py-5">
                <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                  <span className="w-7 h-7 bg-stone-800 rounded-lg flex items-center justify-center">
                    <NotepadTextIcon className="w-4 h-4 text-stone-400" />
                  </span>
                  Caractéristiques
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 px-6 pb-6">
                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Domaine</p>
                  <p className="font-semibold">Domaine du Grand Brussy</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Appellation</p>
                  <p className="font-semibold">AOP Menetou Salon</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Millésime</p>
                  <p className="font-semibold">2022</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Pays</p>
                  <p className="font-semibold">France</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Région</p>
                  <p className="font-semibold">Val de Loire</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Cépages</p>
                  <p className="font-semibold">
                    Sauvignon Blanc
                  </p>
                </div>
              </div>
            </section>

            {/* Notes de dégustation */}
            <section className="bg-stone-900/40 rounded-2xl shadow-xl shadow-black/20 border border-rose-900/25 overflow-hidden">
              <div className="border-l-4 border-amber-300/30 px-6 py-5">
                <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                  <span className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                    <GrapeIcon className="w-4 h-4 text-amber-900" />
                  </span>
                  Dégustation
                </h2>
              </div>

              <div className="px-6 pb-6 space-y-5">
                <div>
                  <h3 className="font-semibold mb-2">Nez</h3>
                  <p className="text-stone-300">Friand, aux accents de fruits exotiques, de pêche, de fleurs des champs.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Bouche</h3>
                  <p className="text-stone-300">Tendre, souple, d'une grande fraîcheur.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Accords</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-rose-900/20 border border-rose-800/30 px-3 py-1 text-sm sm:text-base text-rose-200">
                      🥩 Viandes rouges
                    </span>

                    <span className="rounded-full bg-rose-900/20 border border-rose-800/30 px-3 py-1 text-sm sm:text-base text-rose-200">
                      🧀 Fromages
                    </span>

                    <span className="rounded-full bg-rose-900/20 border border-rose-800/30 px-3 py-1 text-sm sm:text-base text-rose-200">
                      🍫 Chocolat
                    </span>
                  </div>
                </div>

              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Quick Facts */}
            <div className="bg-stone-900/40 rounded-2xl shadow-xl shadow-black/20 border border-rose-900/25 overflow-hidden">

              <div className="bg-linear-to-r from-rose-900/20 to-stone-900 px-6 py-4">
                <h3 className="font-bold text-stone-100">Informations</h3>
              </div>

              <div className="space-y-5 p-6 text-sm sm:text-base">

                <InfoRow icon="💰" label="Prix" value="14,50 €" />

                <InfoRow icon="⭐" label="Note" value="16 / 20" />

                <InfoRow icon="📅" label="Acheté le" value="14/02/2026" />

                <InfoRow icon="❤️" label="Favori" value="Oui" />

                <InfoRow icon="🍷" label="Catégorie" value="Blanc" />

              </div>

            </div>

          </aside>
        </div>

        {/* Scroll to top */}
        <ScrollToTopButton bottom="bottom-38 sm:bottom-24" />

      </div >


    </div >
  )
}

export default WineDetails