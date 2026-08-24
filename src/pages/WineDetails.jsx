//@ts-nocheck
import { useState, useEffect } from "react"
import { getWine } from "@/api/wineService"
import { useAuth } from "@/contexts/AuthContext"

import { Button, InfoRow, Loading } from "@/components"
import ScrollToTopButton from "@/components/ui/ScrollToTopButton"
import { GrapeIcon, InfoIcon, NotepadTextIcon, Pencil, Trash2 } from "lucide-react"
import { NavLink, useParams } from "react-router-dom"
import { FaWineGlassAlt } from "react-icons/fa"

const WineTypeStyles = {
  rouge: "bg-red-900/25 border border-red-700/30 text-red-300",
  blanc: "bg-yellow-900/25 border border-yellow-700/30 text-yellow-300",
  rosé: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
  rose: "bg-pink-900/25 border border-pink-700/30 text-pink-300",
  champagne: "bg-purple-900/25 border border-purple-700/30 text-purple-300",
  spiritueux: "bg-sky-900/25 border border-sky-700/30 text-sky-300",
  orange: "bg-orange-900/25 border border-orange-700/30 text-orange-300",
  default: "bg-stone-800 border border-stone-700 text-stone-300",
}

const WineTypeBadge = ({ type = "Autre" }) => {
  const style = WineTypeStyles[type?.toLowerCase()] || WineTypeStyles.default

  return (
    <span
      className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full ${style}`}
    >
      🍷 {type}
    </span>
  )
}

const WineDetails = () => {

  const { isAuthenticated } = useAuth()

  const { slug } = useParams()

  const [wine, setWine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWine = async () => {

      try {

        setLoading(true)
        setError(null)

        const data = await getWine(slug)

        setWine(data.data)

      } catch (error) {

        console.error("Erreur lors du chargement du vin :", error);


        if (error.response?.status === 404) {
          setError("Ce vin n'existe pas ou n'est plus disponible.");
        } else {
          setError("Impossible de charger ce vin. Veuillez réessayer.");
        }

      } finally {

        setLoading(false)

      }
    }

    fetchWine()

  }, [slug])

  // Chargement
  if (loading) {
    return (
      <Loading text="Chargement du vin..." />
    )
  }

  // Erreur
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">

        <p className="text-rose-400">
          {error}
        </p>

        <NavLink
          to="/"
          className="rounded-xl border border-rose-900/30 px-5 py-3 text-sm font-semibold text-stone-300 transition hover:bg-rose-900/20"
        >
          Retour aux vins
        </NavLink>

      </div>
    )
  }

  if (!wine) {
    return null
  }

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
              {wine.image ? (
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="h-50 sm:h-80 w-auto drop-shadow-2xl"
                />
              ) : (
                <div className="flex h-50 sm:h-80 items-center justify-center text-stone-500">
                  Aucune image
                </div>
              )}

            </div>

            {/* Infos */}
            <div className="flex items-center">
              <div className="text-white">

                <WineTypeBadge type={wine.wine_type} />

                <h1 className="mt-6 text-2xl sm:text-5xl font-serif font-bold">
                  {wine.name} {wine.vintage}
                </h1>

                {wine.domain && (
                  <p className="mt-4 text-xl sm:text-3xl font-serif font-semibold text-rose-100">
                    {wine.domain}
                  </p>
                )}

                <p className="mt-2 text-lg text-rose-200 font-medium">
                  {wine.appellation}
                </p>

                {wine.rating !== null && (
                  <div className="mt-6">

                    <div className="flex justify-between text-sm mb-2">
                      <span>Ma note</span>
                      <span className="font-bold text-white">{Number(wine.rating)} / 20</span>
                    </div>

                    <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-amber-500 to-yellow-300"
                        style={{ width: `${(Number(wine.rating) / 20) * 100}%` }}
                      />
                    </div>

                  </div>
                )}


                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {wine.region && (
                    <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                      📌 {wine.region}
                    </span>
                  )}

                  {wine.price !== null && (
                    <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                      💰 {wine.price.replace(".", ",")} €
                    </span>
                  )}

                  {wine.favorite && (
                    <span className="rounded-full bg-stone-900/40 backdrop-blur border border-white/10 px-4 py-2">
                      ❤️ Favori
                    </span>
                  )}
                </div>

                {/* Boutons */}
                {isAuthenticated && (
                  <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap gap-4">
                    <NavLink
                      to={`/dashboard/wines/${wine.slug}/edit`}
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

                )}

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
                <p className="text-stone-300 leading-relaxed">
                  {wine.description || "Aucune description"}
                </p>
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
                  <p className="font-semibold">{wine.domain || "-"}</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Appellation</p>
                  <p className="font-semibold">{wine.appellation || "-"}</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Millésime</p>
                  <p className="font-semibold">{wine.vintage || "-"}</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Pays</p>
                  <p className="font-semibold">{wine.country || "-"}</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Région</p>
                  <p className="font-semibold">{wine.region || "-"}</p>
                </div>

                <div className="border-b border-stone-800 pb-4">
                  <p className="text-sm text-stone-300">Cépages</p>
                  <p className="font-semibold">{wine.grape || "-"}</p>
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
                  <p className="text-stone-300">{wine.nose || "-"}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Bouche</h3>
                  <p className="text-stone-300">{wine.palate || "-"}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Accords</h3>

                  <div className="flex flex-wrap gap-2">
                    {wine.pairings?.length > 0 ? (

                      wine.pairings.map((pairing, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-rose-900/20 border border-rose-800/30 px-3 py-1 text-sm sm:text-base text-rose-200"
                        >
                          {pairing}
                        </span>
                      ))

                    ) : (
                      <span className="text-stone-500">
                        Aucun accord renseigné.
                      </span>
                    )}
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

                <InfoRow icon="💰" label="Prix" value={wine.price !== null ? `${wine.price.replace(".", ",")} €` : "-"} />

                <InfoRow icon="⭐" label="Note" value={wine.rating !== null ? `${Number(wine.rating)} / 20` : "-"} />

                <InfoRow icon="📅" label="Acheté le" value={wine.purchase_date ? new Date(wine.purchase_date).toLocaleDateString("fr-FR") : "-"} />

                <InfoRow icon="🛒" label="Vendeur" value={wine.seller || "-"} />

                <InfoRow icon="❤️" label="Favori" value={wine.favorite ? "Oui" : "Non"} />

                <InfoRow icon="🍷" label="Catégorie" value={wine.wine_type || "-"} />

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