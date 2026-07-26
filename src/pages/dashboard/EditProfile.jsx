// @ts-nocheck
import { Button, TextInput } from "@/components"
import { useEffect, useRef, useState } from "react"

import ponyo from "@/assets/images/ponyo.jpg"
import { FaCamera, FaLock, FaSave, FaTrash, FaUpload, FaUserCog } from "react-icons/fa"


const EditProfile = () => {
  
  // Nouvelle image choisie
  const [image, setImage] = useState(null)
  // Prévisualisation
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  // image déja enregistrée venant de l'api
  const currentImage = ponyo


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
          Modifier mon profil
        </h1>
      </header>


      <form className="bg-white px-4 py-3 rounded-md shadow-md space-y-8">

        {/* Informations du compte */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <FaUserCog className="text-stone-600" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Informations du compte
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Nom d'utilisateur, email et sécurité
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <TextInput
              label="Nom d'utilisateur"
              name="username"
              defaultValue="elviredev"
              required={true}
            />

            <TextInput
              type="email"
              label="Adresse e-mail"
              name="email"
              defaultValue="elviredev@gmail.com"
              required={true}
            />

          </div>
        </div>

        {/* Modifier le MDP */}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <FaLock className="text-rose-600" />
            </div>

            <div>
              <h3 className="text-sm md:text-base font-semibold text-stone-900">
                Sécurité
              </h3>

              <p className="text-xs md:text-sm text-stone-500">
                Modifier votre mot de passe
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <TextInput
              type="password"
              label="Mot de passe actuel"
              name="current_password"
              autoComplete="current-password"
            />

            <TextInput
              type="password"
              label="Nouveau mot de passe"
              name="password"
              autoComplete="new-password"
            />

            <TextInput
              type="password"
              label="Confirmer le mot de passe"
              name="password_confirmation"
              autoComplete="new-password"
            />

          </div>

          <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 p-4">

            <p className="text-sm text-amber-800">
              Le mot de passe doit contenir au minimum 8 caractères.
            </p>

          </div>

        </div>


        {/* 📷 Photo */}

        <div className="space-y-8">

          <label className="block text-sm font-medium text-gray-700">Avatar</label>

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
                  className="h-44 w-44 rounded-2xl object-contain shadow"
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
                  <FaTrash className="text-sm" />
                </button>

                {/* Bouton Changer la photo */}
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

        <div className="mt-10 py-6 border-t border-stone-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="font-medium text-stone-700">
              Votre compte est prêt à être mis à jour.
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


    </div>
  )
}

export default EditProfile