import { Grape } from "lucide-react"


const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-rose-900/30 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand */}
          <div className="flex items-center gap-2 text-stone-200 hover:text-rose-300">
            <Grape className="w-4 h-4 " />
            <span className="font-semibold tracking-wide text-sm">              
              Le Verre & le Bouchon              
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-stone-500">
            Elviredev ©  Le Verre & le Bouchon. Tous droits réservés.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-stone-400 hover:text-rose-300 transition duration-200">Politique de confidentialité</a>
            <a href="#" className="text-xs text-stone-400 hover:text-rose-300 transition duration-200">Conditions</a>
            <a href="#" className="text-xs text-stone-400 hover:text-rose-300 transition duration-200">Contact</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer