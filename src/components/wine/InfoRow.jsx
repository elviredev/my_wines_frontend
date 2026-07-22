const InfoRow = ({ icon, label, value }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <span className="text-stone-500">{label}</span>
            </div>

            <span className="font-semibold">{value}</span>
        </div>

    )
}

export default InfoRow