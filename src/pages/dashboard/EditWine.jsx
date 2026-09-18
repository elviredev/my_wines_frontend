// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import { data, useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, SelectInput, TextareaInput, TextInput, BadgeMultiSelect, ScrollToTopButton, Loading, DateInput, ConfirmModal } from "@/components"
import { FaCloudUploadAlt, FaCamera, FaUpload, FaTimes, FaWineBottle, FaFish, FaCheese, FaWineGlass, FaChevronUp, FaSave } from "react-icons/fa"
import { GiMeat, GiChocolateBar, GiCupcake, GiShrimp, GiCookingPot, GiCampCookingPot } from "react-icons/gi";
import { BadgeEuro, GlassWater, Grape, Star, Wine } from "lucide-react";
import { WINE_TYPE_OPTIONS } from "@/constants/wineTypes";
import { WINE_REGION_OPTIONS } from "@/constants/wineRegions";
import { WINE_PAIRING_OPTIONS } from "@/constants/winePairingOptions";
import { WINE_COUNTRY_OPTIONS } from "@/constants/wineCountries";
import { notifyError, notifySuccess } from "@/utils/notifications";
import { getWine, updateWine, deleteWineImage } from "@/api/wineService";



const EditWine = () => {

  const { slug } = useParams()
  const navigate = useNavigate()

  const [wine, setWine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pairings, setPairings] = useState([]);

  // Rendre les checkbox contrôlées pour la modification
  const [available, setAvailable] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [buyAgain, setBuyAgain] = useState(false)

  // Nouvelle image choisie
  const [image, setImage] = useState(null)
  // Prévisualisation
  const [previewUrl, setPreviewUrl] = useState(null)
  // Modale de confirmation pour supprimer l'image enregistrée
  const [isDeleteImageModaleOpen, setIsDeleteImageModaleOpen] = useState(false)
  // État pendant l'appel API de suppression
  const [deletingImage, setDeletingImage] = useState(false)

  const fileInputRef = useRef(null)
  const currentImage = wine?.image ?? null

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

  // supprimer l'image enregistrée en bdd
  const handleDeleteImage = async () => {

    if (!wine?.slug) return

    try {
      // suppression en cours
      setDeletingImage(true)

      // appel Laravel
      await deleteWineImage(wine.slug)

      // retirer l'image de l'état local
      setWine((currentWine) => ({
        ...currentWine,
        image: null
      }))

      // fermer la modale
      setIsDeleteImageModaleOpen(false)

      notifySuccess("La photo du vin a bien été supprimée")

    } catch (error) {

      console.error("Erreur lors de la suppression de l'image :", error)

      notifyError("Impossible de supprimer la photo du vin.")

    } finally {

      setDeletingImage(false)

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

  // Récupérer le vin quand le composant est chargé
  useEffect(() => {

    const fetchWine = async () => {
      try {

        setLoading(true)

        const data = await getWine(slug)

        setWine(data)
        setPairings(data.pairings ?? [])
        setAvailable(data.available)
        setFavorite(data.favorite)
        setBuyAgain(data.buy_again)

      } catch (error) {

        console.error(error)
        notifyError("Impossible de récupérer ce vin : ", error)

        navigate("/dashboard/wines")

      } finally {
        setLoading(false)
      }
    }

    fetchWine()

  }, [slug])

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!wine) return

    try {

      setSaving(true)

      const formData = new FormData(e.currentTarget)

      // Forcer les valeurs des checkbox
      formData.set("available", available ? "1" : "0")
      formData.set("favorite", favorite ? "1" : "0")
      formData.set("buy_again", buyAgain ? "1" : "0")

      formData.delete("pairings")

      formData.append("pairings", JSON.stringify(pairings))


      if (image) {
        formData.append("image", image)
      }

      await updateWine(wine.slug, formData)

      notifySuccess("Le vin a bien été modifié.")

      navigate("/dashboard/wines")

    } catch (error) {

      console.error("Une erreur est survenue lors de la modification du vin :", error)

      if (error.response?.status === 422) {
        const errors = error.response.data.errors

        const firstError = errors
          ? Object.values(errors)[0]?.[0]
          : null

        notifyError(firstError || "Veuillez vérifier les informations saisies.")

      } else {

        notifyError("Une erreur est survenue lors de l'ajout du vin.")

      }

    } finally {

      setSaving(false)

    }
  }

  // Image à afficher dans le template
  const imageToDisplay = previewUrl || currentImage

  // Chargement
  if (loading) {
    return (
      <Loading text="Chargement du vin..." />
    )
  }

  if (!wine) {
    return null
  }

  return (
    <div className="space-y-12">

      <header className="mb-10 pb-6 items-center justify-between border-b border-white/10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-200">
          Modifier ce vin
        </h1>

        <p className="mt-2 text-stone-400">
          Mettez à jour les informations de votre bouteille.
        </p>
      </header>



      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

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
              defaultValue={wine.name}
              required={true}
            />

            <TextInput
              label="Domaine"
              name="domain"
              labelClassName="text-stone-300"
              defaultValue={wine.domain}
              required={true}
            />

            <TextInput
              label="Millésime"
              type="number"
              name="vintage"
              labelClassName="text-stone-300"
              defaultValue={wine.vintage}
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
              labelClassName="text-stone-300"
              required={true}
              options={WINE_TYPE_OPTIONS}
              placeholder="Choisir un type de vin"
              defaultValue={wine.wine_type}
            />

            <TextInput
              label="Appellation"
              name="appellation"
              labelClassName="text-stone-300"
              defaultValue={wine.appellation}
              required={true}
            />

            <TextInput
              label="Cépage"
              name="grape"
              labelClassName="text-stone-300"
              defaultValue={wine.grape}
            />

            <SelectInput
              label="Pays"
              name="country"
              labelClassName="text-stone-300"
              placeholder="Choisir un pays"
              options={WINE_COUNTRY_OPTIONS}
              defaultValue={wine.country}
              required={true}
            />

            <SelectInput
              label="Région"
              name="region"
              labelClassName="text-stone-300"
              placeholder="Choisir une région"
              options={WINE_REGION_OPTIONS}
              defaultValue={wine.region}
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

          <div className="rounded-2xl border-2 border-dashed border-rose-700/40 hover:border-rose-500 bg-stone-950/40 transition p-8">

            {!imageToDisplay ? (

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
                  src={imageToDisplay}
                  alt="Bouteille"
                  className="h-72 object-contain rounded-lg shadow"
                />

                {/* Bouton Supprimer */}
                {previewUrl ? (
                  // une nouvelle image vient d'être sélectionnée :
                  // on supprime uniquement la prévisualisation locale
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage()
                    }}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-stone-900/90 border border-white/10 hover:bg-white shadow-lg flex items-center justify-center 
                  text-stone-300 hover:text-red-400 transition"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                ) : (
                  // image déja enregistrée :
                  // on demande confirmation avant de supprimer via l'API
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDeleteImageModaleOpen(true)
                    }}
                    className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-stone-900/90 text-stone-300 shadow-lg transition hover:bg-white hover:text-red-400"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}

                {/* Bouton Changer la photo */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg bg-rose-600 text-sm sm:text-base text-white hover:bg-rose-700 transition"
                >
                  <FaUpload className="hidden sm:block" />
                  Modifier la photo de la bouteille
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
              step="0.01"
              min="0"
              labelClassName="text-stone-300"
              defaultValue={wine.price}
            />

            <DateInput
              label="Date d'achat"
              name="purchase_date"
              labelClassName="text-stone-300"
              defaultValue={wine.purchase_date}
            />

            <TextInput
              label="Vendeur"
              name="seller"
              labelClassName="text-stone-300"
              defaultValue={wine.seller}
            />

            <Checkbox
              label="Je racheterai ce vin"
              name="buy_again"
              className="text-stone-300"
              value="1"
              checked={buyAgain}
              onChange={(e) => setBuyAgain(e.target.checked)}
            />

            <Checkbox
              label="Bouteille disponible en cave"
              name="available"
              value="1"
              checked={available}
              className="text-stone-300"
              onChange={(e) => setAvailable(e.target.checked)}
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
              type="number"
              min="0"
              max="20"
              step="0.5"
              name="rating"
              labelClassName="text-stone-300"
              defaultValue={wine.rating !== null ? Number(wine.rating) : ""}
            />

            <Checkbox
              label="Ajouter à mes favoris"
              name="favorite"
              value="1"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
              className="text-stone-300"
            />

            <div className="md:col-span-2">
              <TextareaInput
                label="Description"
                labelClassName="text-stone-300"
                rows={5}
                name="description"
                defaultValue={wine.description}
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
              labelClassName="text-stone-300"
              defaultValue={wine.nose}
            />

            <TextareaInput
              label="Bouche"
              rows={3}
              name="palate"
              labelClassName="text-stone-300"
              defaultValue={wine.palate}
            />

          </div>

          {/* Sélecteur de badges (sélection multiple) */}

          <BadgeMultiSelect
            label="Accords mets & vins"
            name="pairings"
            options={WINE_PAIRING_OPTIONS}
            value={pairings}
            onChange={setPairings}
          />
        </div>

        {/* Zone de soumission du formulaire */}

        <div className="mt-10 py-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="font-medium text-stone-200">
              Votre bouteille est prête à être mise à jour.
            </p>

            <p className="text-sm text-stone-400">
              Vérifiez les informations avant d'enregistrer vos modifications.
            </p>
          </div>

          <Button
            type="submit"
            icon={FaSave}
            className="px-8 py-3"
            disabled={saving}
          >
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>

        </div>

      </form>

      {/* Scroll to top */}
      <ScrollToTopButton />

      {/* Modale de suppression */}
      <ConfirmModal
        isOpen={isDeleteImageModaleOpen}
        onClose={() => setIsDeleteImageModaleOpen(false)}
        onConfirm={handleDeleteImage}
        title="Supprimer la photo"
        message="Êtes-vous sûr de vouloir supprimer la photo de ce vin ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        loading={deletingImage}
      />

    </div>

  )
}

export default EditWine