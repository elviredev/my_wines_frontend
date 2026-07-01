import { Loader2 } from "lucide-react"

/**
 * @param {{
 *   children: React.ReactNode,
 *   type?: "button" | "submit" | "reset",
 *   icon?: React.ComponentType<{ className?: string }>,
 *   className?: string,
 *   loading?: boolean,
 *   loadingText?: string,
 *   disabled?: boolean,
 *   onClick?: React.MouseEventHandler<HTMLButtonElement>
 * }} props
 */
const Button = ({
  children,
  type = "button",
  icon: Icon,
  loading = false,
  loadingText,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`w-full md:w-auto bg-linear-to-r from-rose-700/90 to-red-900/90 hover:from-rose-800 hover:to-red-900 text-white rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 shadow-md shadow-rose-200 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    >
      
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}

      {loading ? loadingText || children : children}
    </button>
  )
}

export default Button