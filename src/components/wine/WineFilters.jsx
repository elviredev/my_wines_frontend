import { MapPinIcon, RotateCcwIcon, BadgeEuroIcon, StarIcon, FilterIcon, Calendar } from "lucide-react"
import { Button, Checkbox, FilterInput, FilterSelect } from "@/components"
import { WINE_REGION_OPTIONS } from "@/constants/wineRegions"
import { WINE_PRICE_OPTIONS } from "@/constants/winePrices"
import { WINE_RATING_OPTIONS } from "@/constants/wineRatings"




const WineFilters = ({ filters, onFiltersChange }) => {


  const handleWineTypeChange = (type, checked) => {
    const wineTypes = checked
      ? [...filters.wine_types, type]
      : filters.wine_types.filter((item) => item !== type)

    onFiltersChange({
      ...filters,
      wine_types: wineTypes,
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      vintage: '',
      region: '',
      min_price: '',
      min_rating: '',
      favorite: false,
      available: false,
      wine_types: [],
    })
  }


  return (
    <aside className="lg:col-span-1 bg-stone-900/40 backdrop-blur-xl rounded-2xl border border-rose-900/25 shadow-2xl shadow-black/20 p-6 lg:h-fit lg:sticky lg:top-8">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-rose-900/30 flex items-center justify-center border border-rose-800/40">
          <FilterIcon className="w-3.5 h-3.5 text-rose-300" />
        </div>
        <h2 className="text-base font-semibold text-stone-100">Filtrer les Vins</h2>
      </div>

      <div className="space-y-4 mb-6">

        {/* Vintage */}
        <div>
          <FilterInput
            label="Millésime"
            name="vintage"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="Année"
            icon={Calendar}
            value={filters.vintage}
            onChange={(e) => {
              onFiltersChange({
                ...filters,
                vintage: e.target.value
              })
            }}
          />
        </div>

        {/* Région */}
        <div>
          <FilterSelect
            label="Région"
            name="region"
            icon={MapPinIcon}
            options={WINE_REGION_OPTIONS}
            placeholder="Région viticole"
            labelClassName="text-stone-200"
            value={filters.region}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                region: e.target.value,
              })
            }
          />
        </div>

        {/* Price */}
        <div>
          <FilterSelect
            label="Prix"
            name="min_price"
            icon={BadgeEuroIcon}
            options={WINE_PRICE_OPTIONS}
            labelClassName="text-stone-200"
            placeholder="Choisir un prix"
            value={filters.min_price}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                min_price: e.target.value,
              })
            }
          />
        </div>

        {/* Min Note */}
        <div>
          <FilterSelect
            label="Note minimum"
            name="min_rating"
            icon={StarIcon}
            options={WINE_RATING_OPTIONS}
            labelClassName="text-stone-200"
            placeholder="Choisir une note"
            value={filters.min_rating}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                min_rating: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="border-t border-stone-700/50 pt-5 mb-5">
        <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">Favoris - Disponible</h3>
        <div className="space-y-2">

          <Checkbox
            label="Mes vins préférés"
            name="favorite"
            className="text-stone-400 text-sm sm:text-base"
            checked={filters.favorite}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                favorite: e.target.checked,
              })
            }
          />

          <Checkbox
            label="Disponible dans ma cave"
            name="available"
            className="text-stone-400 text-sm sm:text-base"
            checked={filters.available}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                available: e.target.checked,
              })
            }
          />

        </div>
      </div>

      {/* Type de vin */}

      <div className="border-t border-stone-700/50 pt-5 mb-5">
        <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">Type de vin</h3>
        <div className="space-y-2">
          {['Blanc', 'Rosé', 'Rouge', 'Champagne', 'Spiritueux', 'Autre'].map((type_vin) => (
            <Checkbox
              key={type_vin}
              label={type_vin}
              value={type_vin}
              name="wine_types[]"
              className="text-stone-400 text-sm sm:text-base"
              checked={filters.wine_types.includes(type_vin)}
              onChange={(e) => handleWineTypeChange(type_vin, e.target.checked)}
            />
          ))}
        </div>
      </div>


      {/* Clear Button */}
      <Button
        icon={RotateCcwIcon}
        fullWidth={true}
        type="button"
        onClick={resetFilters}
      >
        Réinitialiser les filtres
      </Button>
    </aside>
  )
}

export default WineFilters