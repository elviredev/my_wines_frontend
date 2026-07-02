/** 
 * @param {{
 *  label: string,
 *  placeholder?: string,
 *  icon?: React.ComponentType<{ className?: string }>,
 *  className?: string,
 * } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
const FilterInput = ({
   label,
   placeholder,
   icon: Icon,
   className = "",
   ...props
}) => {
   return (
      <div>
         <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            {label}
         </label>

         <div className="relative">
            {Icon && (
               <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            )}

            <input
              placeholder={placeholder}
              className={`w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-600 focus:ring-0 hover:border-rose-600 transition duration-200 ${className}`}
              {...props}
            />
         </div>

      </div>
   )
}

export default FilterInput