
const Loading = ({ text = "Chargement..." }) => {
  
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex items-center gap-3 text-stone-300">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-600 border-t-rose-500" />
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Loading