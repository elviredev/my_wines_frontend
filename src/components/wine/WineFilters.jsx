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
    <aside className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:h-fit lg:sticky lg:top-8">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-rose-100 rounded-lg flex items-center justify-center">
          <FilterIcon className="w-3.5 h-3.5 text-rose-700" />
        </div>
        <h2 className="text-base font-bold text-gray-800">Filtrer Vins</h2>
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

        {/* Year, Region */}
        <div>
          <FilterInput
            label="Année - Région"
            placeholder="Année, région"
            icon={MapPinIcon}
          />
        </div>

        {/* Min Price */}
        <div>
          <FilterSelect
            label="Prix minimum"
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

      {/* Category */}

      <div className="border-t border-gray-100 pt-5 mb-5">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Catégorie</h3>
        <div className="space-y-2">
          {['Blanc', 'Rosé', 'Rouge', 'Effervescent'].map((category) => (            
            <Checkbox 
              key={category}
              label={category}
              value={category}
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