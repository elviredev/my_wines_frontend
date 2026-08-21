export const getImageUrl = (path) => {
    if(!path) {
        return null
    }

    // Si l'API renvoie déja une URL complète
    if(path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }

    return `${import.meta.env.VITE_BASE_URL}${path}`
}