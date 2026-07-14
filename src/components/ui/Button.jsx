import { Loader2 } from "lucide-react"
import { buttonVariants } from "@/utils/buttonVariants"

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> & {
 *   children: React.ReactNode
 *   type?: "button" | "submit" | "reset"
 *   icon?: React.ComponentType<{ className?: string }>
 *   variant?: "primary" | "secondary" | "outline" | "danger"
 *   fullWidth?: boolean
 *   className?: string
 *   loading?: boolean
 *   loadingText?: string
 *   disabled?: boolean
 *   onClick?: React.MouseEventHandler<HTMLButtonElement>
 * }} ButtonProps
 */


/** @param {ButtonProps} props */
const Button = (props) => {  

  const {
    children,
    type = "button",
    icon: Icon,
    fullWidth = false,
    variant = "primary",
    className = "",
    loading = false,
    loadingText,
    disabled = false,
    ...rest
  } = props

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : 'w-full md:w-auto'}  

        rounded-xl px-6 py-3 text-sm font-semibold 
        transition duration-200 
        shadow-md shadow-rose-200 
        flex items-center justify-center gap-2 
        whitespace-nowrap cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed  

        ${buttonVariants[variant]}

        ${className}
      `}
      {...rest}
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