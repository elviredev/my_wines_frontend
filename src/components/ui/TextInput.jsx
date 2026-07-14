
/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   label?: string
 *   error?: string
 *   name?: string
 *   required?: boolean
 *   className?: string
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
    ...rest // Transmet les attributs HTML
  } = props

  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-200 placeholder-gray-500 transition-all focus:outline-none focus:ring-0 focus:border-rose-700 focus:shadow-none
          ${error ? "border-red-500" : "border-gray-200"} 
          ${className}`}
        {...rest}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  )
}

export default TextInput