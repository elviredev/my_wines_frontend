import api from "./axios";

// Liste des vins
export const getWines = async (params = {}) => {
    const { data } = await api.get('/wines', {
        params
    })
    return data
}

// Détail d'un vin
export const getWine = async (slug) => {
    const { data } = await api.get(`/wines/${slug}`)

    return data.data
}

// Créer un vin
export const createWine = async (formData) => {
    const { data } = await api.post('/wines', formData)

    return data
}

// Modifier un vin
export const updateWine = async (slug, formData) => {
    formData.append("_method", "PATCH")

    const { data } = await api.post(`/wines/${slug}`, formData)

    return data
}

// Supprimer l'image d'un vin sans supprimer le vin
export const deleteWineImage = async (slug) => {
    return await api.delete(`/wines/${slug}/image`)
}