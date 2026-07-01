
/**
 * @param {{
 *   label?: string,
 *   name?: string,
 *   rows?: number,
 *   required?: boolean,
 *   error?: string,
 *   className?: string,
 * } & React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */
const TextareaInput = ({ label, name, rows = 3, required = false, error, className = "", ...props }) => {
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

      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border transition-all focus:outline-none focus:ring-0 focus:border-rose-700 focus:shadow-none 
          ${error ? "border-red-500" : "border-gray-200"} 
          ${className}`}
        {...props}
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