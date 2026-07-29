// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import { Button, Checkbox, SelectInput, TextareaInput, TextInput, BadgeMultiSelect, ScrollToTopButton } from "@/components"
import { FaCloudUploadAlt, FaCamera, FaUpload, FaTimes, FaWineBottle, FaFish, FaCheese, FaWineGlass, FaChevronUp  } from "react-icons/fa"
import { GiMeat, GiChocolateBar, GiCupcake, GiShrimp, GiCookingPot, GiCampCookingPot } from "react-icons/gi";
import { WINE_TYPES } from "@/constants/wineTypes";
import { BadgeEuro, GlassWater, Grape, Star, Wine } from "lucide-react";


const pairingOptions = [
  { value: "viande-rouge", label: "Viande rouge", icon: GiMeat },
  { value: "fromage", label: "Fromage", icon: FaCheese },
  { value: "poisson", label: "Poisson", icon: FaFish },
  { value: "fruits-de-mer", label: "Fruits de mer", icon: GiShrimp },
  { value: "dessert", label: "Dessert", icon: GiCupcake },
  { value: "chocolat", label: "Chocolat", icon: GiChocolateBar },
  { value: "aperitif", label: "Apéritif", icon: FaWineGlass },
  { value: "cuisine-italienne", label: "Cuisine italienne", icon: GiCookingPot },
  { value: "cuisine-asiatique", label: "Cuisine asiatique", icon: GiCampCookingPot },
];


const CreateWine = () => {

  const [pairings, setPairings] = useState([]);
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)  
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return;

    // révoquer l'ancienne URL pour éviter les fuites mémoire
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setImage(null)
    setPreviewUrl(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Nettoyage de l'URL de prévisualisation
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl])  
  
  return (
    <div className="space-y-12">

      <header className="mb-10 pb-6 items-center justify-between border-b border-white/10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-200">
          Ajouter un vin
        </h1>

        <p className="mt-2 text-stone-400">
            Complétez les informations de votre bouteille.
        </p>
      </header>


      <form className="space-y-8">

        {/* Infos générales */}

        <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <Wine className="w-5 h-5 text-rose-300" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Informations générales
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Identité de la bouteille
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              label="Nom du vin"
              name="name"
              labelClassName="text-stone-300"
              placeholder="Château Margaux"
              required={true}
            />

            <TextInput
              label="Domaine"
              name="domain"
              labelClassName="text-stone-300"
              placeholder="Château Margaux"
              required={true}
            />

            <TextInput
              label="Millésime"
              type="number"
              name="vintage"
              labelClassName="text-stone-300"
              placeholder="2020"
              required={true}
            />

          </div>
        </div>

        {/* Caractéristiques */}

        <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <Grape className="w-5 h-5 text-rose-300" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Caractéristiques
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Spécificités du vin, géographie...
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <SelectInput
              label="Type de vin"
              name="wine_type"
              required={true}
              options={WINE_TYPES}
              labelClassName="text-stone-300"
              placeholder="Choisir un type de vin"
            />

            <TextInput
              label="Appellation"
              name="appellation"
              labelClassName="text-stone-300"
              placeholder="AOP Côtes du Rhône"
            />

            <TextInput
              label="Cépage"
              name="cepage"
              labelClassName="text-stone-300"
              placeholder="Grenache, Syrah"
            />

            <SelectInput
              label="Pays"
              name="country"
              labelClassName="text-stone-300"
              placeholder="Choisir un pays"
              options={[
                { value: "france", label: "France" },
                { value: "italie", label: "Italie" },
                { value: "espagne", label: "Espagne" },
                { value: "chili", label: "Chili" },
                { value: "autre", label: "Autres" },
              ]}
            />

            <SelectInput
              label="Région"
              name="region"
              labelClassName="text-stone-300"
              placeholder="Choisir une région"
              required={true}
              options={[
                { value: "alsace", label: "Alsace" },
                { value: "beaujolais", label: "Beaujolais" },
                { value: "bordeaux", label: "Bordeaux" },
                { value: "bourgogne", label: "Bourgogne" },
                { value: "champagne", label: "Champagne" },
                { value: "corse", label: "Corse" },
                { value: "jura", label: "Jura" },
                { value: "languedoc", label: "Languedoc" },
                { value: "lorraine", label: "Lorraine" },
                { value: "provence", label: "Provence" },
                { value: "Roussillon", label: "Roussillon" },
                { value: "savoie", label: "Savoie" },
                { value: "sud-ouest", label: "Sud-Ouest" },
                { value: "val-de-loire", label: "Val de Loire" },
                { value: "vallée-du-rhône", label: "Vallée du Rhône" },
                { value: "international", label: "International" },
              ]}
            />

          </div>
        </div>

        {/* 📷 Photo */}

        <div className="space-y-8">

          <label className="block text-md font-medium text-stone-200">Photo de la bouteille</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="rounded-2xl border-2 border-dashed border-rose-700/40 hover:border-rose-500 bg-stone-950/40 transition p-4 sm:p-8">

            {!previewUrl ? (

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center gap-4"
              >

                <div className="w-20 h-20 rounded-full bg-rose-900/20 border border-rose-700/40 shadow flex items-center justify-center">

                  <FaCamera className="text-rose-500 text-3xl" />

                </div>

                <div className="text-center">

                  <p className="font-semibold text-stone-200">
                    Cliquez pour ajouter une photo
                  </p>

                  <p className="text-sm text-stone-500 mt-1">
                    JPG, PNG ou WEBP
                  </p>

                </div>

              </div>

            ) : (
              <div className="relative flex flex-col items-center gap-4">
                {/* Image */}
                <img
                  src={previewUrl}
                  alt="Prévisualisation"
                  className="h-72 object-contain rounded-lg shadow"
                />

                {/* Bouton Supprimer */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage()
                  }}
                  className="absolute -top-2 -right-1.5 sm:top-2 sm:right-3 w-10 h-10 rounded-full bg-stone-900/90 border border-white/10 hover:bg-white shadow-lg 
                  flex items-center justify-center text-stone-300 hover:text-red-400 transition"
                >
                  <FaTimes className="text-sm" />
                </button>

                {/* Bouton Changer la photo */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg bg-rose-600 text-sm sm:text-base text-white hover:bg-rose-700 transition"
                >
                  <FaUpload />
                  Changer la photo
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Achat */}

        <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <BadgeEuro className="w-5 h-5 text-rose-300" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Achat
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Informations sur le prix...
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              label="Prix"
              type="number"
              name="price"
              labelClassName="text-stone-300"
              placeholder="12.50"
              required={true}
            />

            <TextInput
              label="Date d'achat"
              type="date"
              name="purchase_date"
              labelClassName="text-stone-300"
            />

            <TextInput
              label="Vendeur"
              name="seller"
              labelClassName="text-stone-300"
              placeholder="Leclerc"
            />

            <Checkbox
              label="Je racheterai ce vin"
              name="buy_again"
              className="text-stone-300"
            />

            <Checkbox
              label="Bouteille disponible en cave"
              name="is_opened"
              className="text-stone-300"
            />
          </div>
        </div>

        {/* Dégustation */}

        <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <Star className="w-5 h-5 text-rose-300" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Dégustation
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Mon évaluation du vin.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <TextInput
              label="Note (/20)"
              name="rating"
              labelClassName="text-stone-300"
              type="number"
              min="0"
              max="20"
            />

            <Checkbox
              label="Ajouter à mes favoris"
              name="favorite"
              className="text-stone-300"
            />

            <div className="md:col-span-2">
              <TextareaInput
                label="Description"
                rows={5}
                name="description"
                labelClassName="text-stone-200"
                placeholder="Quelques informations sur ce vin..."
              />
            </div>

          </div>
        </div>


        {/* Notes de dégustation */}

        <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <GlassWater className="w-5 h-5 text-rose-300" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Notes de dégustation
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Le nez, la bouche, les accords.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <TextareaInput
              label="Nez"
              rows={3}
              name="nose"
              labelClassName="text-stone-200"
            />

            <TextareaInput
              label="Bouche"
              rows={3}
              name="palate"
              labelClassName="text-stone-200"
            />

          </div>

          {/* Sélecteur de badges (sélection multiple) */}

          <BadgeMultiSelect
            label="Accords mets & vins"
            name="pairings"
            options={pairingOptions}
            value={pairings}
            onChange={setPairings}
          />
        </div>

        {/* Zone de soumission du formulaire */}

        <div className="mt-10 py-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="font-medium text-stone-200">
              Votre bouteille est prête à être enregistrée.
            </p>

            <p className="text-sm text-stone-400">
              Vérifiez les informations avant de l'ajouter à votre collection.
            </p>
          </div>

          <Button
            type="submit"
            icon={FaWineBottle}
            className="px-8 py-3"
          >
            Ajouter ce vin
          </Button>

        </div>

      </form>
      
      {/* Scroll to top */}
      <ScrollToTopButton />

    </div>
  )
}

export default CreateWine