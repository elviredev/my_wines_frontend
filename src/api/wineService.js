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