
/**
 * @typedef {React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
 *   label?: string
 *   name?: string
 *   rows?: number
 *   required?: boolean
 *   error?: string
 *   className?: string
 *   labelClassName?: string
 * }} TextareaInputProps
 */

/** @param {TextareaInputProps} props */
const TextareaInput = (props) => {

  const { label, name, rows = 3, required = false, error, className = "", labelClassName = "text-gray-700", ...rest } = props

  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 text-sm text-stone-200 bg-stone-950/50 rounded-lg border border-white/10 transition-all focus:outline-none focus:ring-0 focus:border-rose-700 focus:shadow-none 
          ${error ? "border-red-500" : "border-white/10"} 
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

export default TextareaInput