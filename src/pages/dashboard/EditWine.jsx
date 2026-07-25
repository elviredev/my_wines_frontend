// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import { Button, Checkbox, SelectInput, TextareaInput, TextInput, BadgeMultiSelect, ScrollToTopButton } from "@/components"
import { FaCloudUploadAlt, FaCamera, FaUpload, FaTimes, FaWineBottle, FaFish, FaCheese, FaWineGlass, FaChevronUp, FaSave  } from "react-icons/fa"
import { GiMeat, GiChocolateBar, GiCupcake, GiShrimp, GiCookingPot, GiCampCookingPot } from "react-icons/gi";

import chateauBellevue from "@/assets/images/image-8.jpg"


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


const EditWine = () => {

  const [pairings, setPairings] = useState([
    "fromage",
    "viande-rouge",
    "chocolat"
  ]);
  // Nouvelle image choisie
  const [image, setImage] = useState(null)
  // Prévisualisation
  const [previewUrl, setPreviewUrl] = useState(null)  
  const fileInputRef = useRef(null)

  // image déja enregistrée venant de l'api
  const currentImage = chateauBellevue
  

  // Quand l'utilisateur choisit une nouvelle photo
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

  // l'utilisateur souhaite retirer la photo qu'il vient de sélectionner
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

  // Image à afficher dans le template
  const imageToDisplay = previewUrl || currentImage
  
  return (
    <div className="space-y-12">

      <header className="mb-6 pb-5 border-b border-gray-300">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Modifier le vin
        </h1>
      </header>


      <form className="bg-white px-4 py-3 rounded-md shadow-md space-y-8">

        {/* Infos générales */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              🍷
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Informations générales
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Identité de la bouteille
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              label="Nom du vin"
              name="name"
              defaultValue="Vieilles Vignes"
              required={true}
            />

            <TextInput
              label="Domaine"
              name="domain"
              defaultValue="Château Bellevue"
              required={true}
            />

            <TextInput
              label="Millésime"
              type="number"
              name="vintage"
              defaultValue="2020"
              required={true}
            />

          </div>
        </div>

        {/* Caractéristiques */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              🍇
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Caractéristiques
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Spécificités du vin, géographie...
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <SelectInput
              label="Type de vin"
              name="category_id"
              required={true}
              options={[
                { defaultValue: "rouge", label: "Rouge" },
                { value: "blanc", label: "Blanc" },
                { value: "rosé", label: "Rosé" },
                { value: "champagne", label: "Champagne" },
              ]}
              
            />

            <TextInput
              label="Appellation"
              name="appellation"
              defaultValue="AOP Saint-Émilion"
            />

            <TextInput
              label="Cépage"
              name="cepage"
              defaultValue="Merlot"
            />

            <SelectInput
              label="Pays"
              name="country"
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
              required={true}
              
              options={[
                { defaultValue: "bordeaux", label: "Bordeaux" },
                { value: "alsace", label: "Alsace" },
                { value: "beaujolais", label: "Beaujolais" },
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

          <label className="block text-sm font-medium text-gray-700">Photo de la bouteille</label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="rounded-xl border-2 border-dashed border-rose-300 hover:border-rose-500 transition bg-rose-50 p-8">

            {!imageToDisplay ? (

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center gap-4"
              >

                <div className="w-20 h-20 rounded-full bg-white shadow flex items-center justify-center">

                  <FaCamera className="text-rose-500 text-3xl" />

                </div>

                <div className="text-center">

                  <p className="font-semibold text-gray-800">
                    Cliquez pour ajouter une photo
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    JPG, PNG ou WEBP
                  </p>

                </div>

              </div>

            ) : (
              <div className="relative flex flex-col items-center gap-4">
                {/* Image */}
                <img
                  src={imageToDisplay}
                  alt="Bouteille"
                  className="h-72 object-contain rounded-lg shadow"
                />

                {/* Bouton Supprimer */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage()
                  }}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600 transition"
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
                  Modifier la photo de la bouteille
                </button>


              </div>
            )}

          </div>

        </div>

        {/* Achat */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              💰
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Achat
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Informations sur le prix...
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              label="Prix"
              type="number"
              name="price"
              defaultValue="18.90"
              required={true}
            />

            <TextInput
              label="Date d'achat"
              type="date"
              name="purchase_date"
            />

            <TextInput
              label="Vendeur"
              name="seller"
              defaultValue="Intermarché"
            />

            <Checkbox
              label="Je racheterai ce vin"
              name="buy_again"
              defaultChecked
            />
          </div>
        </div>

        {/* Dégustation */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              ⭐
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Dégustation
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Mon évaluation du vin.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <TextInput
              label="Note (/20)"
              type="number"
              min="0"
              max="20"
              name="rating"
              defaultValue="17"
            />

            <Checkbox
              label="Ajouter à mes favoris"
              name="favorite"
            />

            <div className="md:col-span-2">
              <TextareaInput
                label="Description"
                rows={5}
                name="description"
                defaultValue="Rosé frais et fruité aux notes de pêche blanche, d'agrumes et de fruits rouges. Très agréable en été."
              />
            </div>

          </div>
        </div>



        {/* Notes de dégustation */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              👃
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Notes de dégustation
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Le nez, la bouche, les accords.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <TextareaInput
              label="Nez"
              rows={3}
              name="nose"
              defaultValue="Friand, aux accents de fruits exotiques, de pêche, de fleurs des champs."
            />

            <TextareaInput
              label="Bouche"
              rows={3}
              name="palate"
              defaultValue="Tendre, souple, d'une grande fraîcheur."
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

        <div className="mt-10 py-6 border-t border-stone-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="font-medium text-stone-700">
              Votre bouteille est prête à être mise à jour.
            </p>

            <p className="text-sm text-stone-500">
              Vérifiez les informations avant d'enregistrer vos modifications.
            </p>
          </div>

          <Button
            type="submit"
            icon={FaSave}
            className="px-8 py-3"
          >
            Enregistrer les modifications
          </Button>

        </div>

      </form>
      
      {/* Scroll to top */}
      <ScrollToTopButton />

    </div>
  )
}

export default EditWine