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

    return data
}

// Créer un vin
export const createWine = async (formData) => {
    const { data } = await api.post('/wines', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return data
}