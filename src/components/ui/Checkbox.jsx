import { CheckIcon } from "lucide-react"

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   label?: string
 *   className?: string
 * }} CheckboxProps 
 */

/** @param {CheckboxProps} props */
const Checkbox = (props) => {

  const {
    label,
    className = "",
    ...rest
  } = props

  return (
    <label className={`group  flex items-center gap-2.5 cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="peer absolute inset-0 opacity-0 cursor-pointer"
          {...rest}
        />

        <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white flex items-center justify-center transition-all duration-200 group-hover:border-rose-600 group-has-checked:bg-rose-700 group-has-checked:border-rose-700">

          <CheckIcon className="w-3 h-3 text-white opacity-0 scale-75 transition-all duration-200 
               group-has-checked:opacity-100 group-has-checked:scale-100" />

        </div>
      </div>

      <span>{label}</span>
    </label>
  )
}

export default Checkbox