
/**
 * @typedef {React.SelectHTMLAttributes<HTMLSelectElement> & {
 *   label?: string
 *   name?: string
 *   placeholder?: string
 *   required?: boolean
 *   options?: {value: string | number, label: string}[]
 *   error?: string
 *   className?: string
 * }} SelectInputProps
 */

/** @param {SelectInputProps} props */
const SelectInput = (props) => {

  const {
    label,
    name,
    options = [],
    placeholder = "Sélectionner une option",
    required = false,
    error,
    className = "",
    ...rest
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

      <select
        id={name}
        name={name}
        required={required}
        className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border placeholder-gray-500 transition-all appearance-none focus:outline-none focus:ring-0 focus:border-rose-700 focus:shadow-none 
          ${error ? "border-red-500" : "border-gray-200"} 
          ${className}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) =>
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  )
}

export default SelectInput