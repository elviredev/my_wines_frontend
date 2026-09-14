//@ts-nocheck
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { ArrowLeftIcon, Wine, Heart, Star, Tags, MapPinned, Euro, Trophy, Calendar, Grape } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Label, Sector } from "recharts"
import { getDashboard } from "@/api/dashboardService"
import { notifyError } from "@/utils/notifications"
import { Loading } from "@/components"


const wineTypeColors = {
  Rouge: "#7F1D1D",
  Blanc: "#E7D7A8",
  Rosé: "#F4A8C5",
  Champagne: "#D4AF37"
}

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true)
        setError(null)

        const data = await getDashboard()

        setDashboard(data)

      } catch (error) {

        console.error("Erreur lors du chargement du tableau de bord.", error)

        // @ts-ignore
        setError("Impossible de charger le tableau de bord.")

        notifyError("Impossible de charger le tableau de bord.")

      } finally {

        setLoading(false)

      }
    }

    fetchDashboard()

  }, [])

  // Chargement
  if (loading) {
    return (
      <Loading text="Chargement du tableau de bord..." />
    )
  }

  // Erreur
  if (error || !dashboard) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-red-600">
          {error ?? "Impossible de charger le tableau de bord."}
        </p>
      </div>
    )
  }

  // Extraction des données de l'API
  const { stats, distribution, infos } = dashboard

  const WineSector = (props) => {
    const { index, ...rest } = props

    return (
      <Sector
        {...rest}
        fill={wineTypeColors[distribution[index]?.name] ?? "#78716C"}
      />
    )
  }

  // Données d'affichage des statistiques
  const statCards = [
    {
      label: "Vins",
      value: stats.wines,
      icon: Wine,
      color: "text-rose-300"
    },
    {
      label: "Favoris",
      value: stats.favorites,
      icon: Heart,
      color: "text-rose-700",
    },
    {
      label: "Note moyenne",
      value: stats.average_rating !== null
        ? `${stats.average_rating} /20`
        : "—",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      label: "Types de vin",
      value: stats.wine_types,
      icon: Tags,
      color: "text-sky-400",
    },
    {
      label: "Régions",
      value: stats.regions,
      icon: MapPinned,
      color: "text-emerald-400",
    },
    {
      label: "Valeur",
      value: `${stats.value} €`,
      icon: Euro,
      color: "text-lime-400",
    },
  ]

  // Données d'affichage des informations
  const infoCards = [
    {
      icon: Trophy,
      title: "Meilleur vin",
      value: infos.best_wine
    },
    {
      icon: Grape,
      title: "Cépage principal",
      value: infos.main_grape,
    },
    {
      icon: MapPinned,
      title: "Région favorite",
      value: infos.favorite_region,
    },
    {
      icon: Calendar,
      title: "Millésime le plus ancien",
      value: infos.oldest_vintage,
    },
    {
      icon: Heart,
      title: "Favoris",
      value: infos.favorites !== null
        ? `${infos.favorites} bouteilles`
        : "—",
    },
    {
      icon: Euro,
      title: "Prix moyen",
      value: infos.average_price !== null
        ? `${infos.average_price} €`
        : "—",
    },
    {
      icon: Wine,
      title: "Vin le plus cher",
      value: infos.most_expensive_wine,
    },
    {
      icon: Star,
      title: "Dernier ajout",
      value: infos.last_added,
    },
  ]


  return (
    <div className="space-y-10">

      <header className="mb-6 sm:mb-8 pb-4 flex justify-between">

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-200">
            Tableau de bord
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-400">
            Un aperçu rapide de ma cave.
          </p>
        </div>

        <NavLink
          to="/"
          className="self-start inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-rose-700 to-red-800 px-3 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-rose-800 hover:to-red-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Accueil
        </NavLink>

      </header>

      {/* stats */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {statCards.map(({ label, value, icon: Icon, color }) => (

          <div key={label} className="rounded-3xl bg-linear-to-br from-rose-900 to-rose-950 shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-stone-300">{label}</p>

                <h2 className="text-2xl font-semibold text-stone-200">{value}</h2>

              </div>

              <div className="rounded-2xl bg-rose-200/20 p-4">

                <Icon className={`size-8 ${color}`} />

              </div>

            </div>

          </div>

        ))}

      </section>

      {/* graphique */}

      <section className="grid items-start gap-6 lg:grid-cols-[435px_1fr]">


        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-olive-700 via-olive-800 to-stone-900 p-3 sm:p-8">

          {/* Décorations */}

          <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full bg-red-400/10" />

          <div className="absolute bottom-40 -left-20 h-40 w-40 rounded-full bg-amber-300/10" />

          {/* Contenu */}

          <h2 className="relative mb-8 text-xl font-semibold text-white">Répartition des vins</h2>

          <div className="relative flex flex-col items-center">

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={distribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={82}
                    outerRadius={122}
                    paddingAngle={3}
                    strokeWidth={0}
                    shape={WineSector}
                  >

                    <Label
                      position="center"
                      content={() => (
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x="50%"
                            dy="-0.2em"
                            className="fill-white text-4xl sm:text-5xl font-bold"
                          >
                            {stats.wines}
                          </tspan>

                          <tspan
                            x="50%"
                            dy="1.9em"
                            className="fill-rose-200 text-sm tracking-wide"
                          >
                            bouteilles
                          </tspan>
                        </text>
                      )}
                    />
                  </Pie>

                </PieChart>

              </ResponsiveContainer>
            </div>

            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

              {distribution.map(({ name, value }) => (

                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5"
                >

                  <div className="flex items-center gap-3" >

                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: wineTypeColors[name] ?? "#78716C" }}
                    />

                    <span className="text-xs sm:text-sm text-white">{name}</span>

                  </div>

                  <span className="font-semibold text-rose-100">
                    {value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Informations */}

        <div className="rounded-3xl border border-white/10 bg-linear-to-br from-olive-700 via-olive-800 to-stone-900 p-8 h-full">

          <h2 className="mb-8 text-xl font-semibold text-white">Quelques informations</h2>

          <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">

            {infoCards.map(({ icon: Icon, title, value }) => (

              <div
                key={title}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/10 transition-colors hover:bg-white/10"
              >

                <div className="rounded-xl bg-rose-900/30 p-3">

                  <Icon className="size-5 text-rose-200" />

                </div>

                <div>

                  <p className="text-sm text-rose-200">
                    {title}
                  </p>

                  <p className="mt-1  text-white">
                    {value ?? "—"}
                  </p>

                </div>



              </div>

            ))}

          </div>

        </div>

      </section>



    </div>
  )
}

export default Dashboard