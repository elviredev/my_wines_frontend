import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

/**
 * Affiche les en-têtes triables
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> & {
 *   className?: string,
 *   label: string,
 *   column: string,
 *   sortBy: string | null,
 *   direction: string | null,
 *   onSort: (column: string) => void,
 *   align?: "left" | "center" | "right",
 * }} SortableHeaderProps
 */


/** @param {SortableHeaderProps} props */
const SortableHeader = (props) => {

  const {
    type = "button",
    className = "",
    label,
    column,
    sortBy,
    direction,
    onSort,
    align = "left",
    ...rest
  } = props

  const isActive = sortBy === column;

  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <button
      type={type}
      onClick={() => onSort(column)}
      className={`
        flex w-full items-center gap-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer
        ${isActive
          ? "text-rose-400"
          : "text-stone-400 hover:text-stone-200"
        }
        ${alignClass[align]}
        ${className}
      `}
      {...rest}
    >
      {label}

      {isActive
        ? direction === "asc"
          ? <ArrowUp className="h-3.5 w-3.5" />
          : <ArrowDown className="h-3.5 w-3.5" />
        : <ArrowUpDown className="h-3.5 w-3.5 text-stone-600" />}

    </button>
  )
}

export default SortableHeader