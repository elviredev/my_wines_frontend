
/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   label?: string
 *   placeholder?: string
 *   icon?: React.ComponentType<{ className?: string }>
 *   className?: string
 * }} FilterInputProps
 *  
 */

/** @param {FilterInputProps} props */
const FilterInput = (props) => {

  const {
    label,
    placeholder,
    icon: Icon,
    className = "",
    ...rest
  } = props

  return (
    <div>
      <label className="block text-xs font-semibold text-stone-100 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-700" />
        )}

        <input
          placeholder={placeholder}
          className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-950/60 border border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-rose-500 focus:ring-0 hover:border-rose-700 transition duration-200 ${className}`}
          {...rest}
        />
      </div>

    </div>
  )
}

export default FilterInput