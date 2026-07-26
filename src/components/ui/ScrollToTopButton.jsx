import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

/**
 * @typedef {Object} ScrollToTopButtonProps
 * @property {string} [className]
 * @property {string} [bottom]
 * @property {string} [right]
 */

/**
 * @param {ScrollToTopButtonProps} props
 */
const ScrollToTopButton = ({bottom = "bottom-4", right = "right-6", className = ""}) => {

   const [isVisible, setIsVisible] = useState(false);

   // Afficher le bouton scroll to top
   useEffect(() => {
      const handleScroll = () => {
         setIsVisible(window.scrollY > 400)
      }

      // Vérifie la position au chargement
      handleScroll();

      window.addEventListener("scroll", handleScroll)

      return () => {
         window.removeEventListener("scroll", handleScroll)
      }
   }, [])

   // fonction pour remonter
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      })
   }

   if (!isVisible) return null;

   return (
      <button
         type="button"
         aria-label="Remonter en haut"
         title="Remonter en haut"
         onClick={scrollToTop}
         className={`
            fixed bottom-4 right-6 z-50 
            flex h-12 w-12 items-center justify-center 
            rounded-full bg-stone-900/50 backdrop-blur-xl border border-rose-900/25 text-rose-400 
            shadow-lg transition-all duration-300 
            hover:scale-110 hover:bg-rose-800 hover:text-stone-100 hover:border-rose-800 
            focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 
            ${className} ${bottom} ${right}`
         }
      >
         <FaChevronUp className="h-5 w-5" />
      </button>
   )
}

export default ScrollToTopButton