import { Button, InfoRow } from "@/components"
import { GrapeIcon, InfoIcon, NotepadTextIcon, Pencil, Trash2 } from "lucide-react"


const WineDetails = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:px-10 lg:py-10 max-w-7xl">

        {/* ── Hero Header ─────────────────────────────────────── */}
        <header className="relative bg-linear-to-br from-rose-900 via-red-900 to-stone-900 rounded-2xl shadow-xl mb-8 overflow-hidden">

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

            <div className="absolute -right-36 -bottom-36 h-128 w-lg rounded-full bg-radial from-white/12 via-white/4 to-transparent" />

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

                <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-4 py-1.5 text-sm backdrop-blur">
                  🍷 Blanc
                </span>

                <h1 className="mt-6 text-2xl sm:text-5xl font-black tracking-tight">
                  Menetou Salon 2023
                </h1>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Ma note</span>
                    <span className="font-bold text-white">16 / 20</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-xl text-rose-100">
                  Domaine du Grand Brussy
                </p>

                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/15 px-4 py-2">
                    🇫🇷 Val de Loire
                  </span>

                  <span className="rounded-full bg-white/15 px-4 py-2">
                    💰 14,90 €
                  </span>

                  <span className="rounded-full bg-white/15 px-4 py-2">
                    ❤️ Favori
                  </span>
                </div>

                {/* Boutons */}
                <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap gap-4">
                  <Button
                    variant="secondary"
                    icon={Pencil}
                    className="shadow-none"
                  >
                    Modifier
                  </Button>

                  <Button
                    variant="outline"
                    icon={Trash2}
                    className="shadow-none"
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
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="border-l-4 border-rose-700 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-50 rounded-lg flex items-center justify-center">
                    <InfoIcon className="w-4 h-4 text-rose-700" />
                  </span>
                  À propos
                </h2>
              </div>

              <div className="px-6 pb-6">
                <p className="text-stone-600 leading-relaxed">Le Menetou Salon est un vin blanc du Centre Val de Loire aux arômes de fruits exotiques, de pêche, de fleurs des champs. Bouche tendre, souple et d'une grande fraîcheur.</p>
              </div>
            </section>

            {/* Caractéristiques */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="border-l-4 border-olive-500 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-7 h-7 bg-olive-100 rounded-lg flex items-center justify-center">
                    <NotepadTextIcon className="w-4 h-4 text-olive-600" />
                  </span>
                  Caractéristiques
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-y-5 px-6 pb-6">
                <div>
                  <p className="text-sm text-stone-500">Domaine</p>
                  <p className="font-semibold">Domaine du Grand Brussy</p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Appellation</p>
                  <p className="font-semibold">AOP Menetou Salon</p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Millésime</p>
                  <p className="font-semibold">2022</p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Pays</p>
                  <p className="font-semibold">France</p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Région</p>
                  <p className="font-semibold">Val de Loire</p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Cépages</p>
                  <p className="font-semibold">
                    Sauvignon Blanc
                  </p>
                </div>
              </div>
            </section>

            {/* Notes de dégustation */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="border-l-4 border-red-900 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
                    <GrapeIcon className="w-4 h-4 text-red-900" />
                  </span>
                  Dégustation
                </h2>
              </div>

              <div className="px-6 pb-6 space-y-5">
                <div>
                  <h3 className="font-semibold mb-2">Nez</h3>
                  <p className="text-stone-600">Friand, aux accents de fruits exotiques, de pêche, de fleurs des champs.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Bouche</h3>
                  <p className="text-stone-600">Tendre, souple, d'une grande fraîcheur.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Accords</h3>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1">
                      🥩 Viandes rouges
                    </span>

                    <span className="rounded-full bg-red-50 px-3 py-1">
                      🧀 Fromages
                    </span>

                    <span className="rounded-full bg-red-50 px-3 py-1">
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
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">

              <div className="bg-linear-to-r from-rose-50 to-red-50 px-6 py-4">
                <h3 className="font-bold">Informations</h3>
              </div>

              <div className="space-y-5 p-6">

                <InfoRow icon="💰" label="Prix" value="14,50 €" />

                <InfoRow icon="⭐" label="Note" value="16 / 20" />

                <InfoRow icon="📅" label="Acheté le" value="14/02/2026" />

                <InfoRow icon="❤️" label="Favori" value="Oui" />

                <InfoRow icon="🍷" label="Catégorie" value="Blanc" />

              </div>

            </div>

            

          </aside>
        </div>
      </div >
    </div >
  )
}

export default WineDetails