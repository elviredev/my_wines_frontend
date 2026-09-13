import { FaTimes, FaExclamationTriangle } from "react-icons/fa"
import { Button } from "@/components"

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ?",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  loading = false
}) => {


  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >

      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-stone-900 p-6 shadow-2xl">

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Fermer"
          className="absolute right-4 top-3 flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition hover:bg-white/10 hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <FaTimes size={22} />
        </button>

        {/* Icône */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-900/30 text-red-400">
          <FaExclamationTriangle size="25" />
        </div>

        {/* Contenu */}
        <h2
          id="confirm-modal-title"
          className="pr-8 text-xl font-semibold text-stone-100"
        >
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-stone-400">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Suppression..." : confirmText}
          </Button>
        </div>

      </div>

    </div>
  )
}

export default ConfirmModal