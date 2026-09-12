import { useState } from "react"

/**
 * @typedef {React.SelectHTMLAttributes<HTMLSelectElement> & {
 *   label?: string
 *   name?: string
 *   placeholder?: string
 *   required?: boolean
 *   options?: {value: string | number, label: string}[]
 *   error?: string
 *   className?: string
 *   labelClassName? : string
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
    labelClassName = "text-gray-700",
    defaultValue,
    ...rest
  } = props

  const [hasValue, setHasValue] = useState(
    defaultValue !== undefined && defaultValue !== ""
  )

  const handleChange = (e) => {
    setHasValue(e.target.value !== "")
    rest.onChange?.(e)
  }

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

      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`w-full px-4 py-3 bg-stone-950/50 rounded-lg border transition-all appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 focus:shadow-none text-sm
          ${hasValue ? "text-stone-300" : "text-stone-500"}
          ${error ? "border-red-500" : "border-white/10"} 
          ${className} `}
        {...rest}
      >
        <option value="" hidden >
          {placeholder}
        </option>

        {options.map((option) =>
          <option key={option.value} value={option.value} className="bg-stone-900 text-stone-100">
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