/**
 * @typedef {React.SelectHTMLAttributes<HTMLSelectElement> & {
 *   label: string,
 *   icon?: React.ComponentType<{ className?: string }>,
 *   placeholder?: string
 *   options: { label: string, value: string | number }[],
 *   className?: string
 *   labelClassName? : string
 * }} FilterSelectProps
 * 
 */

/** @param {FilterSelectProps} props */
const FilterSelect = (props) => {

  const {
    label,
    icon: Icon,
    placeholder = "Sélectionner une option",
    options = [],
    className = "",
    labelClassName = "text-stone-100",
    ...rest
  } = props

  return (
    <div>
      <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${labelClassName}`}>
        {label}
      </label>

      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-700" />
        )}

        <select
          className={`w-full appearance-none pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-stone-950/60 tabular-nums border border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-rose-500 focus:ring-0 hover:border-rose-700 transition duration-200 
            ${rest.value ? "text-sm text-stone-200" : "text-sm text-stone-500"}
            ${className}`
          }
          {...rest}
        >
          <option value="" hidden >
          {placeholder}
        </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-stone-900 text-stone-100"
            >
              {option.label}
            </option>
          ))}

        </select>

        {/* Flèche */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}

export default FilterSelect