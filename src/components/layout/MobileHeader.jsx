const MobileHeader = ({ toggleSidebar }) => {
   return (
      <header className="h-16 flex items-center bg-white shadow-md border-b border-olive-300 lg:hidden">
         <button
            onClick={toggleSidebar}
            className="p-4 text-rose-800"
         >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
         </button>
         <div className="ml-4 text-xl font-semibold text-rose-800">
            Pôle Admin
         </div>

      </header>
   )
}

export default MobileHeader