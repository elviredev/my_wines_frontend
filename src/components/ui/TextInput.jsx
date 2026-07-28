import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"


/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   label?: string
 *   error?: string
 *   name?: string
 *   required?: boolean
 *   className?: string
 *   labelClassName?: string
 * }} InputProps
 */

/** @param {InputProps} props */
const TextInput = (props) => {
  // Regroupement des valeurs par défaut dans la destructuration
  const {
    label,
    name,
    type = "text",
    required = false,
    error,
    className = "",
    labelClassName = "text-gray-700",
    ...rest // Transmet les attributs HTML
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === "password"
    ? (showPassword ? "text" : "password")
    : type

  return (
    <div className='space-y-1.5'>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">

        <input
          id={name}
          name={name}
          type={inputType}
          className={`w-full px-4 py-3 text-sm text-stone-200 bg-stone-950/50 rounded-lg border border-white/10 placeholder:text-stone-500 sm:placeholder:text-base transition-all focus:outline-none focus:ring-0 focus:border-rose-600 focus:shadow-none
          ${type === "password" ? "pr-12" : ""}
          ${error ? "border-red-500" : "border-white/10"} 
          ${className}`}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-rose-600 transition"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        )}

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  )
}

export default TextInput