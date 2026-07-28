const MobileHeader = ({ toggleSidebar }) => {
   return (
      <header className="h-16 flex items-center app-background shadow-md border-b border-stone-500/30 lg:hidden">
         <button
            onClick={toggleSidebar}
            className="p-4 text-rose-800"
         >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
         </button>
         <div className="ml-4 text-sm uppercase text-stone-400">
            Pôle Administration
         </div>

      </header>
   )
}

export default MobileHeader