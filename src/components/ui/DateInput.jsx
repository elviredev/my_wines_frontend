// @ts-nocheck
import { useRef, useState, useEffect } from "react"
import { FaCalendarAlt } from "react-icons/fa"


/** 
 *  @typedef {React.InputHTMLAttributes<HTMLInputElement> & { 
 *  label?: string 
 *  error?: string 
 *  name?: string 
 *  required?: boolean 
 *  className?: string 
 *  labelClassName?: string 
 *  }} DateInputProps 
 */

/** @param {DateInputProps} props */
const DateInput = (props) => {
    const {
        label,
        name,
        required = false,
        error,
        className = "",
        labelClassName = "text-gray-700",
        defaultValue = "",
        onChange,
        ...rest

    } = props

    const inputRef = useRef(null)
    const [date, setDate] = useState(defaultValue ?? "")

    const handleChange = (e) => {
        setDate(e.target.value)
        onChange?.(e)
    }

    const openPicker = () => {
        inputRef.current?.showPicker?.()
    }

    const formatDate = (value) => {
        if (!value) {
            return "jj/mm/aaaa"
        }

        const [year, month, day] = value.split("-")
        return `${day}/${month}/${year}`
    }

    const hasDate = Boolean(date)

    useEffect(() => {
        setDate(defaultValue ?? "")
    }, [defaultValue])

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={name}
                    className={`block text-sm font-medium mb-1 ${labelClassName}`}
                >
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                className={` relative w-full bg-stone-950/50 rounded-lg border transition-all cursor-pointer focus-within:border-rose-600 
                    ${error ? "border-red-500" : "border-white/10"} 
                    ${className} 
                `}
                onClick={openPicker}
            >
                {/* Texte affiché */}
                <span
                    className={` block w-full px-4 py-3 pr-12 text-sm select-none ${hasDate ? "text-stone-300" : "text-stone-500"} `}
                >
                    {formatDate(date)}
                </span>

                {/* Icône calendrier */}
                <FaCalendarAlt
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none"
                />

                {/* Vrai input date */}
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type="date"
                    required={required}
                    value={date}
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...rest}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600"> {error} </p>
            )}
        </div>
    )
}
export default DateInput