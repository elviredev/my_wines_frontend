import { MapPinIcon, RotateCcwIcon, Search, BadgeEuroIcon, StarIcon, FilterIcon } from "lucide-react"
import { Button, Checkbox, FilterInput, FilterSelect } from "@/components"


const WineFilters = () => {

  const priceOptions = [
    { value: "", label: "Tous les prix" },
    { value: 5, label: "05 € +" },
    { value: 10, label: "10 € +" },
    { value: 15, label: "15 € +" },
    { value: 20, label: "20 € +" },
  ]

  const ratingOptions = [
    { value: "", label: "Toutes les notes" },
    { value: 5, label: "05 /20 +" },
    { value: 10, label: "10 /20 +" },
    { value: 15, label: "15 /20 +" },
  ]

  return (
    <aside className="lg:col-span-1 bg-stone-900/40 backdrop-blur-xl rounded-2xl border border-rose-900/25 shadow-2xl shadow-black/20 p-6 lg:h-fit lg:sticky lg:top-8">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-rose-900/30 flex items-center justify-center border border-rose-800/40">
          <FilterIcon className="w-3.5 h-3.5 text-rose-300" />
        </div>
        <h2 className="text-base font-bold text-stone-100">Filtrer les Vins</h2>
      </div>

      <div className="space-y-4 mb-6">

        {/* Keyword */}
        <div>
          <FilterInput
            label="Recherche"
            placeholder="Nom, appellation, domaine"
            icon={Search}
          />
        </div>

        {/* vintage, Region */}
        <div>
          <FilterInput
            label="Année - Région"
            placeholder="Année, région"
            icon={MapPinIcon}
          />
        </div>

        {/* Price */}
        <div>
          <FilterSelect
            label="Prix"
            icon={BadgeEuroIcon}
            options={priceOptions}
          />
        </div>

        {/* Min Note */}
        <div>
          <FilterSelect
            label="Note minimum"
            icon={StarIcon}
            options={ratingOptions}
          />
        </div>
      </div>

      {/* Type de vin */}

      <div className="border-t border-stone-700/50 pt-5 mb-5">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Type de vin</h3>
        <div className="space-y-2">
          {['Blanc', 'Rosé', 'Rouge', 'Champagne', 'Spiritueux', 'Autres'].map((type_vin) => (            
            <Checkbox 
              key={type_vin}
              label={type_vin}
              value={type_vin}
            />
          ))}
        </div>
      </div>


      {/* Clear Button */}
      <Button
        icon={RotateCcwIcon}
        fullWidth={true}
      >
        Réinitialiser les filtres
      </Button>
    </aside>
  )
}

export default WineFilters