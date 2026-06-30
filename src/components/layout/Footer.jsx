const Footer = () => {
  return (
    <footer className="bg-rose-950 border-t border-rose-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-olive-300 font-bold text-sm">My Wines</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-olive-400">
            Elviredev ©  My Wines. Tous droites réservés.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-olive-400 hover:text-rose-300 transition duration-200">Politique de confidentialité</a>
            <a href="#" className="text-xs text-olive-400 hover:text-rose-300 transition duration-200">Conditions</a>
            <a href="#" className="text-xs text-olive-400 hover:text-rose-300 transition duration-200">Contact</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer