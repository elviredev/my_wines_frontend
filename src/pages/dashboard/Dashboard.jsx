import { NavLink } from "react-router-dom"
import { ArrowLeftIcon, Wine, Heart, Star, Tags, MapPinned, Euro, Trophy, Calendar, Grape } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Label } from "recharts"


const stats = [
  {
    label: "Vins",
    value: 62,
    icon: Wine,
    color: "text-rose-300"
  },
  {
    label: "Favoris",
    value: 14,
    icon: Heart,
    color: "text-rose-700",
  },
  {
    label: "Note moyenne",
    value: "14.8 /20",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    label: "Types de vin",
    value: 6,
    icon: Tags,
    color: "text-sky-400",
  },
  {
    label: "Régions",
    value: 12,
    icon: MapPinned,
    color: "text-emerald-400",
  },
  {
    label: "Valeur",
    value: "1245 €",
    icon: Euro,
    color: "text-lime-400",
  },
]

const chartData = [
  { name: "Rouge", value: 12, fill: "#7F1D1D" },
  { name: "Blanc", value: 24, fill: "#E7D7A8" },
  { name: "Rosé", value: 18, fill: "#F4A8C5" },
  { name: "Champagne", value: 8, fill: "#D4AF37" },
]

const totalWines = chartData.reduce(
  (total, item) => total + item.value,
  0
)

const infos = [
  {
    icon: Trophy,
    title: "Meilleur vin",
    value: "Clos Saint-Martin 2020"
  },
  {
    icon: Grape,
    title: "Cépage principal",
    value: "Pinot Noir",
  },
  {
    icon: MapPinned,
    title: "Région favorite",
    value: "Bourgogne",
  },
  {
    icon: Calendar,
    title: "Millésime le plus ancien",
    value: "1998",
  },
  {
    icon: Heart,
    title: "Favoris",
    value: "14 bouteilles",
  },
  {
    icon: Euro,
    title: "Prix moyen",
    value: "20,08 €",
  },
  {
    icon: Wine,
    title: "Vin le plus cher",
    value: "Château Margaux",
  },
  {
    icon: Star,
    title: "Dernier ajout",
    value: "Sancerre 2023",
  },
]


const Dashboard = () => {
  return (
    <div className="space-y-10">

      <header className="mb-6 sm:mb-8 pb-4 flex justify-between">

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900">
            Tableau de bord
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-500">
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

        {stats.map(({ label, value, icon: Icon, color }) => (

          <div key={label} className="rounded-3xl bg-linear-to-br from-rose-900 to-rose-950 shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-olive-200">{label}</p>

                <h2 className="text-2xl font-bold text-white">{value}</h2>

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
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={82}
                    outerRadius={122}
                    paddingAngle={3}
                    strokeWidth={0}
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
                            {totalWines}
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

              {chartData.map(({ name, value, fill }) => (

                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5"
                >

                  <div className="flex items-center gap-3" >

                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: fill }}
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

        <div className="rounded-3xl border border-white/10 bg-linear-to-br from-olive-700 via-olive-800 to-stone-900 p-8">

          <h2 className="mb-8 text-xl font-semibold text-white">Quelques informations</h2>

          <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">

            {infos.map(({ icon: Icon, title, value }) => (

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

                  <p className="mt-1 font-semibold text-white">
                    {value}
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