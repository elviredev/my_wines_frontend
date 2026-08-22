// @ts-nocheck
import { Button, TextInput } from "@/components"
import { useEffect, useRef, useState } from "react"

import api from "@/api/axios"
import { useAuth } from "@/contexts/AuthContext"

import ponyo from "@/assets/images/ponyo.jpg"
import { FaCamera, FaLock, FaSave, FaTrash, FaUpload, FaUserCog } from "react-icons/fa"
import { getImageUrl } from "@/utils/image"


const EditProfile = () => {

  // Récupérer user connecté depuis le contexte
  const { user, setUser } = useAuth()

  // Nouvelle image choisie
  const [image, setImage] = useState(null)
  // Prévisualisation
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  // Etats du profil
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Etats mot de passe
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: ""
  })
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordSuccess, setPasswordSuccess] = useState(null)

  // Etat pour désactiver le bouton pendant l'enregistrement
  const [saving, setSaving] = useState(false)

  // Etat pour le formulaire de modification du profile
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  // image déja enregistrée venant de l'api
  const currentImage = getImageUrl(profile?.avatar)


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

  // Modifier le formulaire des infos du profile
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Modifier le formulaire de changement du mdp
  const handlePasswordChange = (e) => {
    const { name, value } = e.target

    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // GET /api/profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const response = await api.get("/profile")

        const user = response.data.data

        setProfile(user)

        setFormData({
          name: user.name,
          email: user.email
        })

      } catch (error) {

        console.error("Erreur lors du chargement du profi :", error)

        setError("Impossible de charger votre profil.")

      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Soumission du form de modification des infos du profile
  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setError(null)

    try {

      if (image) {
        // Avec une image : FormData
        const data = new FormData()

        data.append("name", formData.name)
        data.append("email", formData.email)
        data.append("avatar", image)

        // Laravel recevra cette requête comme un PUT
        data.append("_method", "PUT")

        const response = await api.post("/profile", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        const updatedProfile = response.data.user

        setProfile(updatedProfile)
        setUser(updatedProfile)

        setFormData({
          name: updatedProfile.name,
          email: updatedProfile.email
        })

        // l'image sélectionnée est maintenant enregistrée
        setImage(null)
        setPreviewUrl(null)

        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        console.log("Profil mis à jour :", response.data)

      } else {
        // Sans nouvelle image : PUT JSON classique
        const response = await api.put("/profile", {
          name: formData.name,
          email: formData.email
        })

        const updatedProfile = response.data.user

        setProfile(updatedProfile)
        setUser(updatedProfile)

        setFormData({
          name: updatedProfile.name,
          email: updatedProfile.email
        })

        console.log("Profil mis à jour :", response.data)
      }

    } catch (error) {

      console.error("Erreur lors de la mise à jour du profil :", error)

      if (error.response?.status === 422) {
        console.error("Erreurs de validation :", error.response.data.errors)
      }

      setError("Impossible de mettre à jour votre profil.")

    } finally {

      setSaving(false)

    }

  }

  // Soumission du form de changement du mot de passe
  const handlePasswordSubmit = async (e) => {

    e.preventDefault()

    setSavingPassword(true)
    setPasswordError(null)
    setPasswordSuccess(null)

    try {

      await api.put("/profile/password", passwordData)

      setPasswordSuccess("Votre mot de passe a été modifié avec succès.")

      // Vider les champs après succès
      setPasswordData({
        current_password: "",
        password: "",
        password_confirmation: ""
      })

    } catch (error) {

      console.error("Erreur lors de la modification du mot de passe : ", error)

      if (error.response?.status === 422) {

        console.error("Erreurs de validation : ", error.response.data.errors)

        setPasswordError(error.response.data.message || "Les informations saisies sont invalides.")

      } else {

        setPasswordError("Impossible de modifier votre mot de passe.")

      }

    } finally {

      setSavingPassword(false)

    }

  }

  return (
    <div className="space-y-12">

      <header className="mb-10 pb-6 items-center justify-between border-b border-white/10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-200">
          Modifier votre profil
        </h1>

        <p className="mt-2 text-stone-400">
          Mettez à jour les informations de votre compte.
        </p>
      </header>

      <div className="space-y-12">

        {/* Informations + Avatar */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
                <FaUserCog className="w-5 h-5 text-rose-300" />
              </div>

              <div>
                <h3 className="text-sm md:text-base font-semibold text-stone-200">
                  Informations du compte
                </h3>

                <p className="text-xs md:text-sm text-stone-400">
                  Nom d'utilisateur, email
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <TextInput
                label="Nom d'utilisateur"
                name="name"
                labelClassName="text-stone-300"
                value={formData.name}
                onChange={handleChange}
                required={true}
              />

              <TextInput
                type="email"
                label="Adresse e-mail"
                name="email"
                labelClassName="text-stone-300"
                value={formData.email}
                onChange={handleChange}
                required={true}
              />

            </div>
          </div>


          {/* 📷 Photo */}

          <div className="space-y-8">

            <label className="block text-md font-medium text-stone-200">Avatar</label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="rounded-2xl border-2 border-dashed border-rose-700/40 hover:border-rose-500 bg-stone-950/40 transition p-4 sm:p-8">

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
                    className="h-44 w-44 rounded-2xl object-contain shadow"
                  />

                  {/* Bouton Supprimer */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage()
                    }}
                    className="absolute -top-2 -right-1.5 sm:top-2 sm:right-3 w-10 h-10 rounded-full bg-stone-900/90 border border-white/10 hover:bg-white shadow-lg flex items-center justify-center 
                  text-stone-300 hover:text-red-400 transition"
                  >
                    <FaTrash className="text-sm" />
                  </button>

                  {/* Bouton modifier avatar */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg bg-rose-600 text-sm sm:text-base text-white hover:bg-rose-700 transition"
                  >
                    <FaUpload />
                    Modifier mon avatar
                  </button>

                </div>
              )}

            </div>

          </div>


          {/* Zone de soumission du formulaire */}

          <div className="mt-10 py-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="font-medium text-stone-200">
                Votre compte est prêt à être mis à jour.
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

        {/* Modifier mot de passe */}
        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-3xl border border-white/10 bg-stone-900/40 backdrop-blur-xl shadow-xl shadow-black/20 p-6"
        >

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-900/25 border border-rose-700/30 flex items-center justify-center">
              <FaLock className="w-5 h-5 text-rose-600" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-200">
                Sécurité
              </h3>

              <p className="text-xs md:text-sm text-stone-400">
                Modifier votre mot de passe
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              type="password"
              label="Mot de passe actuel"
              labelClassName="text-stone-300"
              name="current_password"
              value={passwordData.current_password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              required={true}
            />

            <TextInput
              type="password"
              label="Nouveau mot de passe"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              labelClassName="text-stone-300"
              autoComplete="new-password"
              required={true}
            />

            <TextInput
              type="password"
              label="Confirmer le mot de passe"
              name="password_confirmation"
              value={passwordData.password_confirmation}
              onChange={handlePasswordChange}
              labelClassName="text-stone-300"
              autoComplete="new-password"
              required={true}
            />

          </div>

          <div className="mt-5 rounded-lg bg-amber-100/70 border border-amber-200 p-4">

            <p className="text-sm text-amber-900">
              Le mot de passe doit contenir au minimum 8 caractères.
            </p>

          </div>

          {passwordError && (
            <div className="mt-5 rounded-lg bg-red-900/30 border border-red-500/30 p-4">
              <p className="text-sm text-red-300">
                {passwordError}
              </p>
            </div>
          )}

          {passwordSuccess && (
            <div className="mt-5 rounded-lg bg-green-900/30 border border-green-500/30 p-4">
              <p className="text-sm text-green-300">
                {passwordSuccess}
              </p>
            </div>
          )}

          {/* Zone de soumission du formulaire     */}
          <div className="mt-10 py-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="font-medium text-stone-200">
                Votre mot de passe est prêt à être mis à jour.
              </p>

              <p className="text-sm text-stone-400">
                Vérifiez les informations avant d'enregistrer vos modifications.
              </p>
            </div>

            <Button
              type="submit"
              icon={FaLock}
              className="px-6 py-3"
              disabled={savingPassword}
            >
              {savingPassword ? "Modification..." : "Modifier le mot de passe"}
            </Button>

          </div>

        </form>

      </div>



    </div>
  )
}

export default EditProfile