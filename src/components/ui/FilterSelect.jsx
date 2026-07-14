/**
 * @typedef {React.SelectHTMLAttributes<HTMLSelectElement> & {
 *   label: string,
 *   icon?: React.ComponentType<{ className?: string }>,
 *   options: { label: string, value: string | number }[],
 *   className?: string
 * }} FilterSelectProps
 * 
 */

/** @param {FilterSelectProps} props */
const FilterSelect = (props) => {

  const {
    label,
    icon: Icon,
    options = [],
    className = "",
    ...rest
  } = props

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}

        <select
          className={`w-full appearance-none pl-9 pr-10 py-2.5 text-sm tabular-nums border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-600 focus:ring-0 hover:border-rose-600 transition duration-200 ${className}`}
          {...rest}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
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