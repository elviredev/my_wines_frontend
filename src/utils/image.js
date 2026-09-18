export const getImageUrl = (path) => {
    if(!path) {
        return null
    }

    // Si l'API renvoie déja une URL complète
    if(path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }

    // Retirer /api pour obtenir le domaine de base
    const baseUrl = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")

    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
}